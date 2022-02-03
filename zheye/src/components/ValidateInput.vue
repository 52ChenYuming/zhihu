<template>
  <div class="validate-input-container pb-3">
    <input type="text"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      v-bind="$attrs"
      v-model="inputVal"
    >
    <span v-if="inputRef.error" class="invalid-feedback position-absolute mt-1">
      {{inputRef.message}}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, computed, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email' | 'range' ;
  message?: string;
  min?: {message: string, length: number};
  max?: {message: string, length: number};
}
export type RulesProp = RuleProp[]
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputVal = computed({
      get: () => props.modelValue || '',
      set: val => {
        context.emit('update:modelValue', val)
      }
    })
    const inputRef = reactive({
      error: false,
      message: ''
    })
    // const clearInput = () => {
    //   inputVal.value = ''
    // }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message || ''
          const { value } = inputVal
          switch (rule.type) {
            case 'required':
              passed = (value.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(value)
              break
            case 'range': {
              const { min, max } = rule
              if (min && value.trim().length < min.length) {
                passed = false
                inputRef.message = min.message
              }
              if (max && value.trim().length > max.length) {
                passed = false
                inputRef.message = max.message
              }
              break
            }
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    // 将事件发射出去，其实就是把验证函数发射出去
    onMounted(() => {
      return emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      inputVal
    }
  }
})
</script>
