import Pip from "./Pip";
import Suit from "./Suit";
export default class Card {
  constructor(
    public readonly id: number,
    public readonly pip: Pip,
    public readonly suit?: Suit
  ) {}
}
