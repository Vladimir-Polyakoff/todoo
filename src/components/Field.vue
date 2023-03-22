<script>
export default {
  name: 'TheField',

  props: {
    value: { type: String, required: true },
    type: { type: String, required: false, default: 'text' },
    label: { type: String, required: true },
    error: { type: String, require: false }
  }

}
</script>

<template>
  <div class="form">
    <label class="label">{{ label }}</label>
    <input
      :type="type"
      :value="value"
      :style="error && 'border-color: red'"
      @input="$event => $emit('input', $event.target.value.trim())"
    >
    <span class="error">{{ error }}</span>
  </div>
</template>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    align-items: center;
  }
  .label {
    display: inline-block;
    font-size: 10px;
    padding: 10px;
    color: #fff;
  }
  input {
    background: white;
    border: .2 solid #ccc;
    outline: none;
    /* max-width: 240px; */
    height: 24px;
    border-radius: 4px;
  }
  .error {
    margin-top: 4px;
    font-size: 10px;
    color: #3f27279f;
  }
</style>
