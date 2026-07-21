import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';
import { AtsScore } from './AtsScore';
import { StepProgress } from './components/StepProgress';
import { SkillChip } from './components/SkillChip';
import EmptyState from './components/EmptyState';
import { HistorySidebar } from './HistorySidebar';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('Frontend Component Tests', () => {
  it('renders Footer component correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/AI Resume Analyzer/i)).toBeInTheDocument();
    expect(screen.getByText(/Navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/Repository Details/i)).toBeInTheDocument();
  });

  it('renders AtsScore component with high score styling', () => {
    render(<AtsScore score={85} />);
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText(/Excellent Match/i)).toBeInTheDocument();
  });

  it('renders StepProgress component with current step', () => {
    render(<StepProgress currentStep={2} />);
    expect(screen.getByText(/Upload/i)).toBeInTheDocument();
    expect(screen.getByText(/Analyzing/i)).toBeInTheDocument();
    expect(screen.getByText(/Results/i)).toBeInTheDocument();
  });

  it('renders SkillChip component correctly', () => {
    render(<SkillChip skill="Python" type="matched" />);
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders EmptyState component', () => {
    render(<EmptyState />);
    expect(screen.getByText(/No resume uploaded yet/i)).toBeInTheDocument();
  });

  it('renders HistorySidebar with tag filter pills and entry tags', () => {
    const mockEntries = [
      {
        id: '1',
        timestamp: Date.now(),
        score: 85,
        skills: ['Python', 'Django'],
        suggestions: ['Add React'],
        matchedSkills: ['Python'],
        missingSkills: ['React'],
        targetRole: 'Backend Developer',
        fileName: 'resume.pdf',
        tag: 'Applied - Google',
      },
    ];
    render(
      <HistorySidebar
        entries={mockEntries}
        availableTags={['Applied - Google']}
        activeTag={null}
        onSelectTag={() => {}}
        onSelect={() => {}}
        onDelete={() => {}}
        onClear={() => {}}
        isOpen={true}
        onToggle={() => {}}
      />
    );
    expect(screen.getByText(/History/i)).toBeInTheDocument();
    expect(screen.getByText('Applied - Google')).toBeInTheDocument();
  });

  it('renders "Skip to main content" link pointing to #main-content', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
