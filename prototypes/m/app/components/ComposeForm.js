import React from "react"
let ReactPropTypes = React.PropTypes

let ComposeForm = React.createClass({

  propTypes: {
    routes: ReactPropTypes.object
  },

  render: function() {

    return (
      <div className="compose-form">
        <div className="compose-form__wrap compose-form__wrap_input compose-form__wrap_disabled">
          <label className="compose-form__label" htmlFor="compose-form__input_from">От</label>
          <input type="text" id="compose-form__input_from" className="compose-form__input compose-form__input_from" readOnly={true} value="andmironov@rambler.ru"/>
        </div>

        <div className="compose-form__wrap compose-form__wrap_input">
          <label className="compose-form__label" htmlFor="compose-form__input_to">Кому</label>
          <input type="text" id="compose-form__input_to" className="compose-form__input compose-form__input_to" />
        </div>

        <div className="compose-form__wrap compose-form__wrap_input">
          <label className="compose-form__label" htmlFor="compose-form__input_subject">Тема</label>
          <input type="text" id="compose-form__input_subject" className="compose-form__input compose-form__input_subject" />
        </div>

        <div className="compose-form__wrap compose-form__wrap_textarea">
          <textarea className="compose-form__textarea compose-form__textarea_content"></textarea>
        </div>

        <div className="compose-form__actions">
          <a href="mail/compose" className="button button_primary button_big button_send">Отправить</a>
          <a href="mail/compose" className="button button_transparent button_big">Сохранить черновик</a>
        </div>
      </div>
    )
  }
})

module.exports = ComposeForm
