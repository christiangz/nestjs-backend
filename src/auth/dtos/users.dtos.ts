import {
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly password: string;
}