export default class Emoji {
  constructor(
    emoji,
    description,
    category,
    aliases,
    tags,
    unicode_version,
    ios_version
  ) {
    this.emoji = emoji;
    this.description = description;
    this.category = category;
    this.aliases = aliases;
    this.tags = tags;
    this.unicode_version = unicode_version;
    this.ios_version = ios_version;
  }
}
