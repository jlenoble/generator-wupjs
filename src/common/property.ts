import EventEmitter from "events";

type Name = Wup.Name;
type Value = Wup.Value;
type Prop = Wup.Prop;

export default class Property extends EventEmitter {
  public readonly name: Name;

  private _value: Value;
  private _prevValue: Value;

  public get value(): Value {
    return this._value;
  }
  public set value(value: Value) {
    if (value === this._prevValue) {
      return;
    }

    this._prevValue = this._value;
    this._value = value;
    this.emit("change", value);
  }

  public constructor({ name, value }: Prop) {
    super();

    this.name = name;
    this._value = value;
    this._prevValue = value;
  }
}
