import { CompanyFormData, Testimonial } from '../types/index'; // Updated import path
import { BackgroundInfo, ProblemScene, SolutionScene, Competitor, Persona } from '../types/index'; // Adjusted import path
import { getFileFromIndexedDB, saveFileToIndexedDB, deleteFileFromIndexedDB } from './indexedDB';

const STORAGE_KEYS = {
  COMPANY_INFO: 'companyInfo',
  TESTIMONIALS: 'testimonials',
  TESTIMONIALS_FROM_WEBHOOK: 'testimonialsFromWebhook', // New key for webhook testimonials
  BACKGROUND_INFO: 'backgroundInfo',
  BACKGROUND_FILES: 'backgroundFiles',
  PROBLEM_SCENES: 'problemScenes',
  SOLUTION_SCENES: 'solutionScenes',
  COMPETITORS: 'competitors',
  PERSONAS: 'personas',
  CURRENT_STEP: 'currentStep',
} as const;

// Helper function to safely parse JSON from localStorage
const safeJSONParse = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper function to safely set JSON in localStorage with compression
const safeJSONSet = (key: string, value: any) => {
  try {
    // Clean up old data if it exists
    localStorage.removeItem(key);
    
    // Convert to string and compress if needed
    const stringValue = JSON.stringify(value);
    
    // If the string is too long, try to compress it
    if (stringValue.length > 500000) { // 500KB limit
      // Remove unnecessary data
      if (key === 'solutionScenes' || key === 'problemScenes' || key === 'backgroundInfo') {
        const compressedData = value.map((item: any) => ({
          id: item.id,
          links: item.links,
          // Only keep essential file metadata, not the full base64
          files: item.files?.map((file: any) => ({
            name: file.name,
            type: file.type,
            mimeType: file.mimeType
          }))
        }));
        localStorage.setItem(key, JSON.stringify(compressedData));
        return;
      }
    }
    
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
    // If we hit quota, try to clean up other items
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      try {
        // Remove old data
        localStorage.removeItem('backgroundInfo');
        localStorage.removeItem('problemScenes');
        // Try again with compressed data
        const compressedData = value.map((item: any) => ({
          id: item.id,
          links: item.links,
          files: item.files?.map((file: any) => ({
            name: file.name,
            type: file.type,
            mimeType: file.mimeType
          }))
        }));
        localStorage.setItem(key, JSON.stringify(compressedData));
      } catch (retryError) {
        console.error('Failed to save even after cleanup:', retryError);
      }
    }
  }
};

// Company Information
export const getCompanyInfo = (): CompanyFormData => 
  safeJSONParse(STORAGE_KEYS.COMPANY_INFO, {
    companyName: '',
    companyWebsite: '',
    testimonialsLink: '',
    industry: '',
    companyLinkedIn: '',
    companyCIMonad: undefined,
    companyProduct: '',
    competitors: [],
    testimonialsLinks: [] // Added missing required field
  });

export const setCompanyInfo = (data: CompanyFormData): void => 
  safeJSONSet(STORAGE_KEYS.COMPANY_INFO, data);

// Testimonials
export const getTestimonials = (): Testimonial[] => 
  safeJSONParse(STORAGE_KEYS.TESTIMONIALS, []);

export const saveTestimonials = (testimonials: Testimonial[]): void => {
  try {
    console.log("Saving testimonials to localStorage:", testimonials);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    console.log("Successfully saved testimonials");
  } catch (error) {
    console.error("Error saving testimonials to localStorage:", error);
  }
};

// Webhook Testimonials
export const getTestimonialsFromWebhook = (): Testimonial[] => 
  safeJSONParse(STORAGE_KEYS.TESTIMONIALS_FROM_WEBHOOK, []);

export const setTestimonialsFromWebhook = (testimonials: Testimonial[]): void => {
  try {
    console.log("Saving testimonials from webhook to localStorage:", testimonials);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS_FROM_WEBHOOK, JSON.stringify(testimonials));
    console.log("Successfully saved testimonials from webhook");
  } catch (error) {
    console.error("Error saving testimonials from webhook to localStorage:", error);
  }
};

// Background Information
export const getBackgroundInfo = (): BackgroundInfo[] => 
  safeJSONParse(STORAGE_KEYS.BACKGROUND_INFO, []);

export const setBackgroundInfo = (data: BackgroundInfo[]): void => 
  safeJSONSet(STORAGE_KEYS.BACKGROUND_INFO, data);

// Problem Scenes
export const getProblemScenes = (): ProblemScene[] => 
  safeJSONParse(STORAGE_KEYS.PROBLEM_SCENES, []);

export const setProblemScenes = (data: ProblemScene[]): void => 
  safeJSONSet(STORAGE_KEYS.PROBLEM_SCENES, data);

// Solution Scenes
export const getSolutionScenes = (): SolutionScene[] => 
  safeJSONParse(STORAGE_KEYS.SOLUTION_SCENES, []);

export const setSolutionScenes = (data: SolutionScene[]): void => 
  safeJSONSet(STORAGE_KEYS.SOLUTION_SCENES, data);

// Competitors
export const getCompetitors = (): Competitor[] => 
  safeJSONParse(STORAGE_KEYS.COMPETITORS, []);

export const setCompetitors = (data: Competitor[]): void => 
  safeJSONSet(STORAGE_KEYS.COMPETITORS, data);

// Personas
export const getPersonas = (): Persona[] => 
  safeJSONParse(STORAGE_KEYS.PERSONAS, []);

export const setPersonas = (data: Persona[]): void => 
  safeJSONSet(STORAGE_KEYS.PERSONAS, data);

// Current Step
export const getCurrentStep = (): number => 
  safeJSONParse(STORAGE_KEYS.CURRENT_STEP, 1);

export const setCurrentStep = (step: number): void => 
  safeJSONSet(STORAGE_KEYS.CURRENT_STEP, step);

export const saveScrapedTestimonials = (testimonials: Testimonial[]) => {
  localStorage.setItem("scrapedTestimonials", JSON.stringify(testimonials));
};

export const getScrapedTestimonials = (): Testimonial[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("scrapedTestimonials");
  return saved ? JSON.parse(saved) : [];
};
