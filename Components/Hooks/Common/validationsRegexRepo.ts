export const caseNumberRegex        = '(4)[0-9]{9}$'
export const phoneNumberRegex       = '^(9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$'
export const commercialNumberRegex  = '^(1)[0-9]{9}$'
export const hijriDateRegex         = '^([٠-٢]?[٠-٩])-([٠-١]?[٠-٩])-(١[٣-٤][٠-٩][٠-٩]|[١٢][٠-٩][٠-٩][٠-٩])$'

export const usernamePattern        = '^[a-zA-Z][a-zA-Z0-9_. -]{2,}$'
export const fullNamePattern        = '^[ء-ي][ء-ي ]{5,}$'

export const usernameRegex = {value:usernamePattern, message:'اسم المستخدم يجب ان يبدأ بأحرف ويحتوي على 3 أحرف على الأقل ولا يحتوي على [+%$#/|\!]'}
export const fullNameRegex = {value:fullNamePattern, message:'اسم المستخدم باللغة العربية يجب ان يكون كاملا باللغة العربية و بدون ارقام'}
