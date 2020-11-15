import { DynamicPipeInvoker } from 'src/app/helpers/dynamic-pipe-invoker';


export type AlignmentType = 'left' | 'center' | 'right';
type ColumnDataAccessorFn<T> = ((data: T, name: string) => string);

export interface IPSColumn {
    name: string;
    label: string;
    excludeFromSelector?: boolean;
    cssClass?: string;
    dataAccessor?: ColumnDataAccessorFn<any>;
    getData?(data: any): any;
}

export interface IPSColumnDef<T> extends IPSColumn {
    transform?: string;
    align?: AlignmentType;
    /**
     * Accessor function to retrieve the data should be provided to the cell. If this
     * property is not set, the data cells will assume that the column name is the same
     * as the data property the cells should display.
     */
    readonly fxAlign: string;
    footer?: any;
    dataAccessor?: ColumnDataAccessorFn<T>;
}

export class SelectColumnInfo implements IPSColumn {
    public static readonly columnSelect: IPSColumn = SelectColumnInfo.create('columnSelect',
        'Column Select', 'table-cell-data', true);

    name: string;
    label: string;
    cssClass: string;
    excludeFromSelector?: boolean;

    public static create(name: string, label: string, cssClass: string, excludeFromSelector = false): IPSColumn {
        return {
            name,
            label,
            cssClass,
            excludeFromSelector
        };
    }
}

// tslint:disable-next-line: max-classes-per-file
export class PSCustomColumnDef implements IPSColumn {
    name: string;
    label: string;
    cssClass?: string;
    excludeFromSelector?: boolean;
    dataAccessor?: ColumnDataAccessorFn<any>;

    constructor(name: string, label: string, cssClass: string, excludeFromSelector?: boolean,
                dataAccessor?: ColumnDataAccessorFn<any>) {
        this.name = name;
        this.label = label;
        this.cssClass = cssClass;
        this.excludeFromSelector = excludeFromSelector;
        this.dataAccessor = dataAccessor;
    }

    public static create(name: string, label: string, cssClass?: string, excludeFromSelector?: boolean,
                         dataAccessor?: ColumnDataAccessorFn<any>): IPSColumn {
        return new PSCustomColumnDef(name, label, cssClass, excludeFromSelector, dataAccessor);
    }

    getData(data: any) {
        const result = data ? this.dataAccessor ? this.dataAccessor(data, this.name) : (data as any)[this.name] : undefined;
        return result;
    }

}

// tslint:disable-next-line: max-classes-per-file
export class PSColumnDef<T> implements IPSColumnDef<T> {
    name: string;
    label: string;
    align?: AlignmentType;
    cssClass?: string;
    excludeFromSelector?: boolean;
    footer: any;
    transform: string;
    dataAccessor: ColumnDataAccessorFn<T>;

    get fxAlign() {
        switch (this.align) {
            case 'center':
                return 'center center';
            case 'right':
                return 'end center';
            default:
                return 'start center';
        }
    }

   // TODO group transform and DynamicPipeInvoker
   constructor(def: Partial<IPSColumnDef<T>>, private transformer?: DynamicPipeInvoker) {
        this.name = def.name;
        this.label = def.label;
        this.align = def.align || 'left';
        this.cssClass = def.cssClass;
        this.footer = def.footer;
        this.dataAccessor = def.dataAccessor;
        this.transform = def.transform;
    }

    getData(data: T) {
        let result = this.dataAccessor ? this.dataAccessor(data, this.name) : (data as any)[this.name];
        if (this.transform) {
            if (!this.transformer) {
                throw new Error('transformer must be passed in constructor/building column defs');
            }
            result = this.transformer.transform(result, this.transform);
        }

        return result;
    }

    // tslint:disable-next-line: member-ordering
    public static create<T>(name: string, label: string, cssClass?: string, dataAccessor?: ColumnDataAccessorFn<T>): IPSColumnDef<T> {
        return PSColumnDef.createWithAlign(name, label, 'left', dataAccessor);
    }

    // tslint:disable-next-line: member-ordering
    public static createWithAlign<T>(name: string,
                                     label: string,
                                     align: AlignmentType,
                                     dataAccessor?: ColumnDataAccessorFn<T>): IPSColumnDef<T> {
        return new PSColumnDef({
            name,
            label,
            dataAccessor,
            align
        });
    }

    // tslint:disable-next-line: member-ordering
    public static createStatusType<T>(transformer: DynamicPipeInvoker): IPSColumnDef<T> {
        return new PSColumnDef({ name: 'status', label: 'Status', transform: 'statusType' }, transformer);
    }

    // tslint:disable-next-line: member-ordering
    public static createDate<T>(name: string, label: string, transformer: DynamicPipeInvoker,
                                format?: string, dataAccessor?: ColumnDataAccessorFn<T>): IPSColumnDef<T> {
        return new PSColumnDef({
            name,
            label,
            dataAccessor,
            transform: !format ? `date: dateformat` : `date: dateformat:` + format
        }, transformer);
    }
}
