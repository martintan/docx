import { IDrawingOptions } from "../drawing";
import { IMediaData } from "../media";
import { Paragraph } from "./paragraph";
import { PictureRun } from "./run";

export class ImageParagraph extends Paragraph {
    private readonly pictureRun: PictureRun;

    constructor(imageData: IMediaData, drawingOptions?: IDrawingOptions) {
        super({});
        this.pictureRun = new PictureRun(imageData, drawingOptions);
        this.root.push(this.pictureRun);
    }

    public get Run(): PictureRun {
        return this.pictureRun;
    }
}
