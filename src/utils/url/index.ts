
export class UrlParser {
  private seperator: string = "--";


  public parseCategorySlug = (slug: string) => {
    if (slug.includes(this.seperator)) {
      this.splitTwoParts(slug);
    } else {

    }
  }

  private splitTwoParts = (twoParts: string) => {
    return twoParts.replace(this.seperator, "/");
  }
}
