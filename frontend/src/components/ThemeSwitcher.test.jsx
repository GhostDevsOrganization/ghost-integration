import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { ThemeProvider } from '../context/ThemeContext';

// Mock the ThemeContext
jest.mock('../context/ThemeContext', () => {
    const originalModule = jest.requireActual('../context/ThemeContext');

    // Mock theme data
    const mockThemes = {
        NEON_BLUE: {
            name: 'Neon Blue',
            colors: { accentPrimary: '#4F8FFF' }
        },
        COSMIC_ORANGE: {
            name: 'Cosmic Orange',
            colors: { accentPrimary: '#FF6F61' }
        },
        KASPA_GREEN: {
            name: 'Kaspa Green',
            colors: { accentPrimary: '#6EC7BB' }
        },
        CLEAN_WHITE: {
            name: 'Clean White',
            colors: { accentPrimary: '#3B82F6' }
        }
    };

    // Create a custom mock version of useTheme
    const mockUseTheme = jest.fn().mockReturnValue({
        theme: 'KASPA_GREEN',
        themeData: mockThemes.KASPA_GREEN,
        allThemes: mockThemes,
        toggleTheme: jest.fn(),
        setTheme: jest.fn()
    });

    return {
        ...originalModule,
        useTheme: mockUseTheme,
        ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>,
    };
});

describe('ThemeSwitcher Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    test('renders correctly with default props', () => {
        render(<ThemeSwitcher />);

        // Check if the theme buttons are rendered
        expect(screen.getByTitle(/current theme/i)).toBeInTheDocument();

        // Check that the dropdown button is rendered
        const dropdownButton = screen.getByRole('button', { name: '' });
        expect(dropdownButton).toBeInTheDocument();

        // Initially dropdown should be closed
        expect(screen.queryByText('Select Theme')).not.toBeInTheDocument();
    });

    test('shows dropdown when dropdown button is clicked', async () => {
        render(<ThemeSwitcher />);

        // Click the dropdown button
        const dropdownButton = screen.getAllByRole('button')[1]; // Get the second button (dropdown)
        fireEvent.click(dropdownButton);

        // Dropdown should now be visible
        await waitFor(() => {
            expect(screen.getByText('Select Theme')).toBeInTheDocument();
            expect(screen.getByText('Kaspa Green')).toBeInTheDocument();
            expect(screen.getByText('Neon Blue')).toBeInTheDocument();
            expect(screen.getByText('Cosmic Orange')).toBeInTheDocument();
            expect(screen.getByText('Clean White')).toBeInTheDocument();
        });
    });

    test('displays theme name when showLabel is true', () => {
        render(<ThemeSwitcher showLabel={true} />);

        // Check if the theme name is displayed
        expect(screen.getByText('Kaspa Green')).toBeInTheDocument();
    });

    test('calls toggleTheme when theme button is clicked', () => {
        const { useTheme } = require('../context/ThemeContext');
        const toggleThemeMock = jest.fn();

        // Override the mock return value for this specific test
        useTheme.mockReturnValue({
            theme: 'KASPA_GREEN',
            themeData: {
                name: 'Kaspa Green',
                colors: { accentPrimary: '#6EC7BB' }
            },
            allThemes: {},
            toggleTheme: toggleThemeMock,
            setTheme: jest.fn()
        });

        render(<ThemeSwitcher />);

        // Click the theme toggle button
        const themeButton = screen.getByTitle(/current theme/i);
        fireEvent.click(themeButton);

        // toggleTheme should have been called
        expect(toggleThemeMock).toHaveBeenCalledTimes(1);
    });

    test('calls setTheme when a theme is selected from dropdown', async () => {
        const { useTheme } = require('../context/ThemeContext');
        const setThemeMock = jest.fn();
        const mockThemes = {
            NEON_BLUE: {
                name: 'Neon Blue',
                colors: { accentPrimary: '#4F8FFF' }
            },
            KASPA_GREEN: {
                name: 'Kaspa Green',
                colors: { accentPrimary: '#6EC7BB' }
            }
        };

        // Override the mock return value for this specific test
        useTheme.mockReturnValue({
            theme: 'KASPA_GREEN',
            themeData: mockThemes.KASPA_GREEN,
            allThemes: mockThemes,
            toggleTheme: jest.fn(),
            setTheme: setThemeMock
        });

        render(<ThemeSwitcher />);

        // Open dropdown
        const dropdownButton = screen.getAllByRole('button')[1];
        fireEvent.click(dropdownButton);

        // Select Neon Blue theme
        const neonBlueOption = await screen.findByText('Neon Blue');
        fireEvent.click(neonBlueOption);

        // setTheme should have been called with 'NEON_BLUE'
        expect(setThemeMock).toHaveBeenCalledWith('NEON_BLUE');
    });
});
