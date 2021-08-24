import 'mocha';
import { expect, assert } from 'chai';
import { shallowMount, VueWrapper } from '@vue/test-utils';

import VEmojiPicker from '@/VEmojiPicker.vue';

let wrapper: VueWrapper<VEmojiPicker>;

beforeEach(() => {
  wrapper = shallowMount(VEmojiPicker);
});

afterEach(() => {
  wrapper.unmount();
});

describe('VEmojiPicker', () => {
  // isVueInstance was removed from test-unit api
  // it('Is Instance', () => {
  //   assert.isTrue(wrapper.isVueInstance());
  // });

  it('Is Visible', () => {
    assert.isTrue(wrapper.isVisible());
  });

  it('Has emojis', () => {
    expect(wrapper.props().customEmojis.length).above(1000);
  });

  it('Has categories', () => {
    expect(wrapper.props().customCategories.length).above(5);
  });
});
