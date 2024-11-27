import { Body, Controller, Post, Route } from "tsoa";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

interface AuthRequest {
  email: string;
  password: string;
}

@Route("auth")
export class AuthController extends Controller {
  @Post("register")
  public async register(@Body() body: AuthRequest): Promise<any> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: { email: body.email, password: hashedPassword },
    });
    return { message: "User registered", userId: user.id };
  }

  @Post("login")
  public async login(@Body() body: AuthRequest): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      this.setStatus(401);
      return { message: "Invalid credentials" };
    }
    const token = generateToken(user.id);
    return { message: "Login successful", token };
  }
}
