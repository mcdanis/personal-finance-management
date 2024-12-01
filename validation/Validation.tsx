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

  static isNumber(param: number, text: string) {
    if (!param || isNaN(Number(param))) {
      return `${text} must be a valid number.`;
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

    if (Object.keys(newErrors).length <= 0) {
      return true;
    }
    return newErrors;
  }

  static validateCategory(formData: any) {
    const newErrors: Record<any, any> = {};

    const category = this.required(formData.category, "Kategori");

    if (category) newErrors.category = category;

    if (Object.keys(newErrors).length <= 0) {
      return true;
    }
    return newErrors;
  }

  static validateSubCategory(formData: any) {
    const newErrors: Record<any, any> = {};

    const subCategory = this.required(formData.name, "Sub Kategori");
    const categoryId = this.required(formData.categoryId, "Kategori Utama");

    if (subCategory) newErrors.name = subCategory;
    if (categoryId) newErrors.categoryId = categoryId;

    if (Object.keys(newErrors).length <= 0) {
      return true;
    }
    return newErrors;
  }
}
