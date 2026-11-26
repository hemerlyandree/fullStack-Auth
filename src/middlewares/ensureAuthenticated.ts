import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction } from "express"
import { authConfig } from "@/configs/auth"
import { verify } from "jsonwebtoken"

interface TokenPayload {
  sub: string
  role: String
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id, role } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload

    request.user = {
      id: String(user_id),
      role,
    }

    return next()
  } catch (error) {
    throw new AppError("JWT Token inválido", 401)
  }
}

export { ensureAuthenticated }