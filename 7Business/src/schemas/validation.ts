/**
 * 7Business - Validation Schemas
 * Zod schemas for form validation
 */

// Note: Para usar Zod, você precisa instalar com: npm install zod react-hook-form
// Este é um schema alternativo que funciona sem Zod externo, usando validação inline

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  companyName: string;
  category: 'beauty' | 'mechanics' | 'health' | 'other';
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

/**
 * Validação de email
 */
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Email inválido' };
  }
  return { valid: true };
};

/**
 * Validação de senha
 */
export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 6) {
    return { valid: false, error: 'Senha deve ter pelo menos 6 caracteres' };
  }
  return { valid: true };
};

/**
 * Validação de login
 */
export const validateLoginForm = (data: LoginFormData): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.email.trim()) {
    errors.email = 'Email é obrigatório';
  } else {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.valid) {
      errors.email = emailValidation.error || 'Email inválido';
    }
  }

  if (!data.password.trim()) {
    errors.password = 'Senha é obrigatória';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.error;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validação de signup
 */
export const validateSignupForm = (data: SignupFormData): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.companyName.trim()) {
    errors.companyName = 'Nome da empresa é obrigatório';
  }

  if (!data.email.trim()) {
    errors.email = 'Email é obrigatório';
  } else {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.valid) {
      errors.email = emailValidation.error || 'Email inválido';
    }
  }

  if (!data.password.trim()) {
    errors.password = 'Senha é obrigatória';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.error;
    }
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Senhas não conferem';
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = 'Você deve aceitar os termos';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
