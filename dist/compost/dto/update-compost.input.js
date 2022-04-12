"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompostInput = void 0;
const create_compost_input_1 = require("./create-compost.input");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateCompostInput extends (0, mapped_types_1.PartialType)(create_compost_input_1.CreateCompostInput) {
}
exports.UpdateCompostInput = UpdateCompostInput;
//# sourceMappingURL=update-compost.input.js.map