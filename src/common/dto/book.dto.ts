import { InteractionType } from "@prisma/client";

export class InteractionInfo {
  type: InteractionType;
  value: number;
}
