// https://github.com/skaterdav85/validatorjs
import Validator from 'validatorjs'

class Validation {
  static run (value, ruleString) {
    const data = {
      key: value
    }
    const rules = {
      key: ruleString
    }
    const v = new Validator(data, rules, this.customMessage)
    if (v.fails()) {
      const errors = v.errors.all()
      return errors.key.join('、')
    }
    return true
  }

  static customMessage = {
    required: '必須です',
    max: ':max文字以内で入力してください',
    email: 'Eメール形式で入力してください'
  }
}
export default Validation
