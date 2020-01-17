<template>
  <div class="container">
    <div class="field">
      <label class="label">Name</label>
      <div class="control has-icons-right">
        <text-component :module="'customer'" :state="'name'" />
        <validate-icon-component :module="'customer'" :state="'name'" />
      </div>
      <error-component :module="'customer'" :state="'name'" />
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-right">
        <text-component :module="'customer'" :state="'email'" />
        <validate-icon-component :module="'customer'" :state="'email'" />
      </div>
      <error-component :module="'customer'" :state="'email'" />
    </div>

    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Text input" value="bulma">
        <span class="icon is-small is-left">
          <i class="fas fa-user" />
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check" />
        </span>
      </div>
      <p class="help is-success">
        This username is available
      </p>
    </div>

    <div class="field">
      <label class="label">Subject</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="textarea" placeholder="Textarea" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="question">
          No
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">
          Submit
        </button>
      </div>
      <div class="control">
        <button class="button is-link is-light">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextComponent from '~/components/Text'
import ValidateIconComponent from '~/components/ValidateIcon'
import ErrorComponent from '~/components/Error'

export default {
  components: {
    TextComponent,
    ValidateIconComponent,
    ErrorComponent
  },
  methods: {
    test () {
      console.log('hoge')
    }
  }
}
</script>

<style>
</style>
