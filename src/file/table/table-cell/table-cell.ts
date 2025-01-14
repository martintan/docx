// http://officeopenxml.com/WPtableGrid.php
import { Paragraph } from "file/paragraph";
import { IXmlableObject, XmlComponent } from "file/xml-components";

import { ITableShadingAttributesProperties } from "../shading";
import { Table } from "../table";
import { ITableCellMarginOptions } from "./cell-margin/table-cell-margins";
import { TableCellBorders, VerticalAlign, VMergeType } from "./table-cell-components";
import { TableCellProperties } from "./table-cell-properties";

export interface ITableCellOptions {
    readonly shading?: ITableShadingAttributesProperties;
}

export class TableCell extends XmlComponent {
    private readonly properties: TableCellProperties;

    constructor() {
        super("w:tc");

        this.properties = new TableCellProperties();
        this.root.push(this.properties);
    }

    public add(item: Paragraph | Table): TableCell {
        this.root.push(item);

        return this;
    }

    public prepForXml(): IXmlableObject | undefined {
        // Cells must end with a paragraph
        if (!(this.root[this.root.length - 1] instanceof Paragraph)) {
            const para = new Paragraph({});
            this.add(para);
        }
        return super.prepForXml();
    }

    public setVerticalAlign(type: VerticalAlign): TableCell {
        this.properties.setVerticalAlign(type);

        return this;
    }

    public addGridSpan(cellSpan: number): TableCell {
        this.properties.addGridSpan(cellSpan);

        return this;
    }

    public addVerticalMerge(type: VMergeType): TableCell {
        this.properties.addVerticalMerge(type);

        return this;
    }

    public setMargins(margins: ITableCellMarginOptions): TableCell {
        this.properties.addMargins(margins);

        return this;
    }

    public setShading(attrs: ITableShadingAttributesProperties): TableCell {
        this.properties.setShading(attrs);

        return this;
    }

    public get Borders(): TableCellBorders {
        return this.properties.Borders;
    }

    public get Properties(): TableCellProperties {
        return this.properties;
    }
}
