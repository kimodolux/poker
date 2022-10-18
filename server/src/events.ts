import { ValidationErrorItem } from "joi";

interface Error {
  error: string;
  errorDetails?: ValidationErrorItem[];
}

interface Success<T> {
  data: T;
}

export type Response<T> = Error | Success<T>;

export interface ServerEvents {
  "messageToClient": (msg: string) => void
}

export interface ClientEvents {
  "message": (msg: string) => void
}