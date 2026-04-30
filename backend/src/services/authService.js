const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

class AuthService {
  async signup(data = {}) {
    const { name, email, password, role } = data;

    if (!name || !email || !password) {
      throw new ApiError(400, "Name, email and password are required");
    }

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role: role || "member"
    });

    return {
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken(user);

    return {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}

module.exports = new AuthService();