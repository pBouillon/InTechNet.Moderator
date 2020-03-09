/**
 * @summary Wrapper for all data to send to the image widget
 * @see ImageWidgetComponent
 */
export class ImageWidgetData {

  /**
   * @summary Default constructor
   * @param contenttext to display next to the source
   * @param imgPath source of the image to display along with the text
   */
  constructor(
    public content: string,
    public imgPath: string
  ) { }

}
