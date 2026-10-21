
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    is_active: bool


class ProductOut(BaseModel):
    id: int
    category_id: int
    category_name: str
    name: str
    description: str | None
    price: float
    emoji: str | None
    is_available: bool


class OrderItemInput(BaseModel):
    product_id: int = Field(gt=0)
    quantity: int = Field(ge=1, le=50)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=10, max_length=20)
    address: str = Field(min_length=8, max_length=500)
    payment_method: Literal["COD", "UPI"] = "COD"
    items: list[OrderItemInput] = Field(min_length=1, max_length=50)

    @field_validator("customer_name", "address")
    @classmethod
    def strip_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("This field cannot be blank")
        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        value = value.strip()
        digits = value.removeprefix("+")
        if not digits.isdigit() or not 10 <= len(digits) <= 15:
            raise ValueError(
                "Enter a valid phone number with 10–15 digits"
            )
        return value


class OrderItemOut(BaseModel):
    product_id: int
    product_name: str
    unit_price: float
    quantity: int
    line_total: float


class OrderOut(BaseModel):
    order_number: str
    customer_name: str
    phone: str
    delivery_address: str
    payment_method: str
    payment_status: str
    order_status: str
    subtotal: float
    delivery_fee: float
    total_amount: float
    items: list[OrderItemOut]
    created_at: str
