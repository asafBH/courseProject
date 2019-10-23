import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let LangPipe = class LangPipe {
    transform(value, ...args) {
        if (!value) {
            return '';
        }
        return args.length > 0 ? value[args[0]] : value.en;
    }
};
LangPipe = tslib_1.__decorate([
    Pipe({
        name: 'lang'
    })
], LangPipe);
export { LangPipe };
//# sourceMappingURL=lang.pipe.js.map