
import os
import secrets
from datetime import datetime
from decimal import Decimal
from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
    func,
    select,
)
from sqlalchemy.dialects.mysql import ENUM
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Mapped, Session, mapped_column, relationship

from database import Base, engine, get_db
from schemas import (
    CategoryOut,
    OrderCreate,
    OrderItemOut,
    OrderOut,
    ProductOut,
)

app = FastAPI(
    title="Mr. Kulhad API",
    description="Food menu and ordering API backed by MySQL",
    version="1.0.0",
)

origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://127.0.0.1:5500,http://localhost:5500,"
        "http://127.0.0.1:5501,http://localhost:5501",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


# Map the existing Part 2 MySQL tables.
# This application deliberately does not create or alter tables.

class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class Product(Base):
    __tablename__ = "products"
    __table_args__ = (
        UniqueConstraint(
            "category_id", "name",
            name="uq_product_category_name",
        ),
        CheckConstraint("price >= 0", name="chk_product_price"),
        Index("idx_products_category", "category_id"),
        Index("idx_products_available", "is_available"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"), nullable=False
    )
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str | None] = mapped_column(String(500))
    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False
    )
    emoji: Mapped[str | None] = mapped_column(String(20))
    is_available: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False
    )


class Customer(Base):
    __tablename__ = "customers"
    __table_args__ = (Index("idx_customer_phone", "phone"),)

    id: Mapped[int] = mapped_column(
        BigInteger, primary_key=True, autoincrement=True
    )
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp()
    )


class FoodOrder(Base):
    __tablename__ = "orders"
    __table_args__ = (
        CheckConstraint(
            "subtotal >= 0 AND delivery_fee >= 0 "
            "AND total_amount = subtotal + delivery_fee",
            name="chk_order_amounts",
        ),
        Index("idx_orders_customer", "customer_id"),
        Index("idx_orders_status", "order_status"),
        Index("idx_orders_created", "created_at"),
    )

    id: Mapped[int] = mapped_column(
        BigInteger, primary_key=True, autoincrement=True
    )
    order_number: Mapped[str] = mapped_column(
        String(40), unique=True, nullable=False
    )
    customer_id: Mapped[int] = mapped_column(
        ForeignKey("customers.id"), nullable=False
    )
    delivery_address: Mapped[str] = mapped_column(
        String(500), nullable=False
    )
    payment_method: Mapped[str] = mapped_column(
        ENUM("COD", "UPI"), default="COD", nullable=False
    )
    payment_status: Mapped[str] = mapped_column(
        ENUM("PENDING", "PAID", "FAILED", "REFUNDED"),
        default="PENDING",
        nullable=False,
    )
    order_status: Mapped[str] = mapped_column(
        ENUM(
            "PLACED", "CONFIRMED", "PREPARING",
            "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED",
        ),
        default="PLACED",
        nullable=False,
    )
    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False
    )
    delivery_fee: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), default=Decimal("0.00"), nullable=False
    )
    total_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp()
    )


class OrderItem(Base):
    __tablename__ = "order_items"
    __table_args__ = (
        CheckConstraint("unit_price >= 0", name="chk_item_price"),
        CheckConstraint("quantity > 0", name="chk_item_quantity"),
        Index("idx_order_items_order", "order_id"),
    )

    id: Mapped[int] = mapped_column(
        BigInteger, primary_key=True, autoincrement=True
    )
    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"), nullable=False
    )
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id"), nullable=False
    )
    product_name: Mapped[str] = mapped_column(String(150), nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False
    )
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    # line_total is generated by MySQL; do not insert into it.


@app.get("/")
def home():
    return {
        "message": "Welcome to Mr. Kulhad API",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health(db: Session = Depends(get_db)):
    try:
        db.execute(select(1))
        return {"status": "ok", "database": "connected"}
    except SQLAlchemyError:
        raise HTTPException(
            status_code=503,
            detail="Database connection failed",
        )


@app.get("/api/categories", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    statement = (
        select(Category)
        .where(Category.is_active.is_(True))
        .order_by(Category.name)
    )
    return db.scalars(statement).all()


@app.get("/api/products", response_model=list[ProductOut])
def get_products(
    category_id: int | None = None,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    statement = (
        select(Product, Category.name)
        .join(Category, Product.category_id == Category.id)
        .where(
            Product.is_available.is_(True),
            Category.is_active.is_(True),
        )
    )

    if category_id is not None:
        statement = statement.where(
            Product.category_id == category_id
        )

    if search and search.strip():
        term = f"%{search.strip()}%"
        statement = statement.where(
            Product.name.like(term)
            | Category.name.like(term)
        )

    statement = statement.order_by(Product.name)
    rows = db.execute(statement).all()

    return [
        ProductOut(
            id=product.id,
            category_id=product.category_id,
            category_name=category_name,
            name=product.name,
            description=product.description,
            price=float(product.price),
            emoji=product.emoji,
            is_available=product.is_available,
        )
        for product, category_name in rows
    ]


@app.post(
    "/api/orders",
    response_model=OrderOut,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db),
):
    # Combine duplicate product IDs before calculating totals.
    quantities: dict[int, int] = {}
    for item in payload.items:
        quantities[item.product_id] = (
            quantities.get(item.product_id, 0) + item.quantity
        )

    if any(quantity > 50 for quantity in quantities.values()):
        raise HTTPException(
            status_code=422,
            detail="Maximum quantity per product is 50",
        )

    try:
        # One transaction: either all order records are saved, or none.
        with db.begin():
            products = db.scalars(
                select(Product)
                .where(Product.id.in_(quantities.keys()))
                .with_for_update()
            ).all()

            products_by_id = {product.id: product for product in products}

            if len(products_by_id) != len(quantities):
                raise HTTPException(
                    status_code=400,
                    detail="One or more products do not exist",
                )

            for product_id in quantities:
                product = products_by_id[product_id]
                if not product.is_available:
                    raise HTTPException(
                        status_code=400,
                        detail=f"{product.name} is currently unavailable",
                    )

            subtotal = sum(
                (
                    products_by_id[product_id].price * quantity
                    for product_id, quantity in quantities.items()
                ),
                Decimal("0.00"),
            ).quantize(Decimal("0.01"))

            delivery_fee = Decimal("0.00")
            total = subtotal + delivery_fee

            customer = Customer(
                full_name=payload.customer_name,
                phone=payload.phone,
            )
            db.add(customer)
            db.flush()

            order_number = (
                "MK-" + datetime.now().strftime("%Y%m%d")
                + "-" + uuid4().hex[:8].upper()
            )

            order = FoodOrder(
                order_number=order_number,
                customer_id=customer.id,
                delivery_address=payload.address,
                payment_method=payload.payment_method,
                payment_status="PENDING",
                order_status="PLACED",
                subtotal=subtotal,
                delivery_fee=delivery_fee,
                total_amount=total,
            )
            db.add(order)
            db.flush()

            item_rows = []
            for product_id, quantity in quantities.items():
                product = products_by_id[product_id]
                item_rows.append(
                    OrderItem(
                        order_id=order.id,
                        product_id=product.id,
                        product_name=product.name,
                        unit_price=product.price,
                        quantity=quantity,
                    )
                )

            db.add_all(item_rows)
            db.flush()

            result = {
                "order_number": order.order_number,
                "customer_name": customer.full_name,
                "phone": customer.phone,
                "delivery_address": order.delivery_address,
                "payment_method": order.payment_method,
                "payment_status": order.payment_status,
                "order_status": order.order_status,
                "subtotal": float(order.subtotal),
                "delivery_fee": float(order.delivery_fee),
                "total_amount": float(order.total_amount),
                "items": [
                    {
                        "product_id": row.product_id,
                        "product_name": row.product_name,
                        "unit_price": float(row.unit_price),
                        "quantity": row.quantity,
                        "line_total": float(
                            row.unit_price * row.quantity
                        ),
                    }
                    for row in item_rows
                ],
                "created_at": datetime.now().isoformat(),
            }

        return result

    except HTTPException:
        raise
    except SQLAlchemyError:
        # Do not expose database credentials or internal SQL errors.
        raise HTTPException(
            status_code=500,
            detail="Could not save the order. Please try again.",
        )


@app.get("/api/orders/{order_number}", response_model=OrderOut)
def get_order(
    order_number: str,
    db: Session = Depends(get_db),
):
    order = db.scalar(
        select(FoodOrder).where(
            FoodOrder.order_number == order_number
        )
    )

    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    customer = db.get(Customer, order.customer_id)
    rows = db.scalars(
        select(OrderItem).where(OrderItem.order_id == order.id)
    ).all()

    return {
        "order_number": order.order_number,
        "customer_name": customer.full_name,
        "phone": customer.phone,
        "delivery_address": order.delivery_address,
        "payment_method": order.payment_method,
        "payment_status": order.payment_status,
        "order_status": order.order_status,
        "subtotal": float(order.subtotal),
        "delivery_fee": float(order.delivery_fee),
        "total_amount": float(order.total_amount),
        "items": [
            {
                "product_id": row.product_id,
                "product_name": row.product_name,
                "unit_price": float(row.unit_price),
                "quantity": row.quantity,
                "line_total": float(row.unit_price * row.quantity),
            }
            for row in rows
        ],
        "created_at": order.created_at.isoformat()
        if order.created_at else "",
    }
