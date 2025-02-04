import { XmlComponent } from "file/xml-components";

import { FooterReferenceType } from "./document";
import { Footer } from "./footer/footer";
import { Image, Media } from "./media";
import { Paragraph } from "./paragraph";
import { Relationships } from "./relationships";
import { Table } from "./table";

export interface IDocumentFooter {
    readonly footer: FooterWrapper;
    readonly type: FooterReferenceType;
}

export class FooterWrapper {
    private readonly footer: Footer;
    private readonly relationships: Relationships;

    constructor(private readonly media: Media, referenceId: number, initContent?: XmlComponent) {
        this.footer = new Footer(referenceId, initContent);
        this.relationships = new Relationships();
    }

    public add(item: Paragraph | Table): void {
        this.footer.add(item);
    }

    public addImage(image: Image): FooterWrapper {
        this.footer.add(image.Paragraph);
        return this;
    }

    public addChildElement(childElement: XmlComponent): void {
        this.footer.addChildElement(childElement);
    }

    public get Footer(): Footer {
        return this.footer;
    }

    public get Relationships(): Relationships {
        return this.relationships;
    }

    public get Media(): Media {
        return this.media;
    }
}
