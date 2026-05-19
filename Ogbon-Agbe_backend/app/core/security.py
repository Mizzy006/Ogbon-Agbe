from fastapi import Header, HTTPException
from firebase_admin import auth


async def verify_firebase_token(
    authorization: str = Header(None)
):
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Missing Authorization header"
        )

    try:
        token = authorization.split("Bearer ")[1]

        decoded_token = auth.verify_id_token(token)

        return decoded_token

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid Firebase token"
        )