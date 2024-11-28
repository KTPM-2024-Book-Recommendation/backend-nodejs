import { BadRequestException } from "@nestjs/common";
import { registerDecorator, ValidationOptions } from "class-validator";

export const IsCrawlTimeFormat = (
  property: string,
  validationOptions?: ValidationOptions
) => {
  return function (object, propertyName: string) {
    registerDecorator({
      name: "IsCrawlTimeFormat",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const [hour, minute] = value.split(":").map(Number);

          if (isNaN(hour) || isNaN(minute)) {
            throw new BadRequestException("Hour and minute must be number");
          }

          if (hour < 0 || hour >= 24) {
            throw new BadRequestException("Hour must be between 0 and 24");
          }

          if (minute < 0 || minute >= 60) {
            throw new BadRequestException("Minute must be between 0 and 60");
          }

          return true;
        },
      },
    });
  };
};
