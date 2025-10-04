// Tests unitaires pour les hooks personnalisés
import { renderHook, act } from '@testing-library/react';
import { useNotification } from '@/hooks/useNotification';
import { useFormState } from '@/hooks/useFormState';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Custom Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useNotification', () => {
    it('should add and remove notifications', () => {
      const { result } = renderHook(() => useNotification());

      act(() => {
        result.current.success('Test message');
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].message).toBe('Test message');
      expect(result.current.notifications[0].type).toBe('success');
    });

    it('should handle different notification types', () => {
      const { result } = renderHook(() => useNotification());

      act(() => {
        result.current.error('Error message');
        result.current.warning('Warning message');
        result.current.info('Info message');
      });

      expect(result.current.notifications).toHaveLength(3);
      expect(result.current.notifications.map(n => n.type)).toEqual(['error', 'warning', 'info']);
    });
  });

  describe('useFormState', () => {
    const initialValues = { name: '', email: '' };
    const validationRules = {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    };

    it('should initialize with default values', () => {
      const { result } = renderHook(() => useFormState(initialValues, validationRules));

      expect(result.current.values).toEqual(initialValues);
      expect(result.current.errors).toEqual({});
      expect(result.current.isValid).toBe(false);
    });

    it('should update field values', () => {
      const { result } = renderHook(() => useFormState(initialValues, validationRules));

      act(() => {
        result.current.setValue('name', 'John');
      });

      expect(result.current.values.name).toBe('John');
    });

    it('should validate required fields', () => {
      const { result } = renderHook(() => useFormState(initialValues, validationRules));

      act(() => {
        result.current.validateField('name', '');
      });

      expect(result.current.errors.name).toBe('Ce champ est requis');
    });

    it('should validate email pattern', () => {
      const { result } = renderHook(() => useFormState(initialValues, validationRules));

      act(() => {
        result.current.validateField('email', 'invalid-email');
      });

      expect(result.current.errors.email).toBe('Format invalide');
    });
  });

  describe('useDebounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should debounce value updates', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      expect(result.current).toBe('initial');

      rerender({ value: 'updated', delay: 500 });
      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current).toBe('updated');
    });
  });

  describe('useLocalStorage', () => {
    it('should initialize with default value when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('default');
    });

    it('should initialize with stored value when available', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'));
      
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('stored-value');
    });

    it('should update localStorage when value changes', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      act(() => {
        result.current[1]('new-value');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
      expect(result.current[0]).toBe('new-value');
    });

    it('should handle JSON parse errors gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');
      
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('default');
    });
  });
});