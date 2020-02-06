import 'mocha';
import { expect, assert } from 'chai';
import { shallowMount, Wrapper } from '@vue/test-utils'

import VEmojiPicker from '@/VEmojiPicker.vue'

let wrapper: Wrapper<VEmojiPicker>;

beforeEach(() => {
  wrapper = shallowMount(VEmojiPicker);
});

afterEach(() => {
  wrapper.destroy();
})

describe('VEmojiPicker', () => {
  it('Is Instance', () => {
    assert.isTrue(wrapper.isVueInstance());
  })

  it('Is Visible', () => {
    assert.isTrue(wrapper.isVisible());
  })

  it('Has emojis', () => {
    expect(wrapper.props().customEmojis.length).above(1000);
  })

  it('Has categories', () => {
    expect(wrapper.props().customCategories.length).above(5);
  })
})
