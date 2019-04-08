import EventEmitter from "events";

type PropName = Wup.PropName;
type PropValue = Wup.PropValue;
type Prop = Wup.Prop;

export default class Property extends EventEmitter {
  public readonly name: PropName;

  private _value: PropValue;
  private _prevValue: PropValue;

  public get value(): PropValue {
    return this._value;
  }
  public set value(value: PropValue) {
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
