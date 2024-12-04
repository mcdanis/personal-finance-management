export default class Validation {
  static required(param: any, text: string) {
    if (!param.trim()) {
      return `${text} is required.`;
    }
  }

  static required2(param: any, text: string) {
    if (!param) {
      return `${text} is required.`;
    }
  }

  static isNumber(param: number, text: string, length: number) {
    if (!param || isNaN(Number(param)) || param.toString().length > length) {
      return `${text} must be a valid number and less than 9 characters long.`;
    }
  }

  static validateAccount(formData: any) {
    const newErrors: Record<any, any> = {};

    const accountNameError = this.required(formData.accountName, "Account");
    const balanceError = this.isNumber(formData.ballance, "Balance");
    const typeError = this.required(formData.type, "Type");

    if (accountNameError) newErrors.accountName = accountNameError;
    if (balanceError) newErrors.balance = balanceError;
    if (typeError) newErrors.type = typeError;

    return this.validationCheckResult(newErrors);
  }

  static validateCategory(formData: any) {
    const newErrors: Record<any, any> = {};

    const category = this.required(formData.category, "Kategori");

    if (category) newErrors.category = category;

    return this.validationCheckResult(newErrors);
  }

  static validateSubCategory(formData: any) {
    const newErrors: Record<any, any> = {};
    const subCategory = this.required(formData.name, "Sub Kategori");
    const categoryId = this.required2(formData.categoryId, "Kategori Utama");

    if (subCategory) newErrors.name = subCategory;
    if (categoryId) newErrors.categoryId = categoryId;

    return this.validationCheckResult(newErrors);
  }

  static validationCheckResult(msg: object) {
    if (Object.keys(msg).length <= 0) {
      return true;
    }
    return msg;
  }

  static validateExpenditure(formData: any) {
    const newErrors: Record<any, any> = {};

    const name = this.required(formData.name, "Pengeluaran");
    const date = this.required2(formData.date, "Tanggal Input");
    const categoryId = this.required2(formData.categoryId, "Kategori Utama");
    const subCategoryId = this.required2(
      formData.subCategoryId,
      "Sub Kategori"
    );
    const description = this.required(formData.description, "Keterangan");
    const value = this.isNumber(formData.value, "Nominal", 9);

    if (subCategoryId) newErrors.subCategoryId = subCategoryId;
    if (categoryId) newErrors.categoryId = categoryId;
    if (name) newErrors.name = name;
    if (date) newErrors.date = date;
    if (description) newErrors.description = description;
    if (value) newErrors.value = value;

    return this.validationCheckResult(newErrors);
  }
}
