
export type ClientType = 'Buyer' | 'Seller';

export type BuyerPhase = 'Appointment' | 'Signed Client' | 'Under Contract' | 'Closed';
export type SellerPhase = 'Appointment' | 'Signed Client' | 'Live on MLS' | 'Under Contract' | 'Closed';


export interface UploadedFile {
  name: string;
  url: string; // In a real app, this would be a URL to cloud storage
}

export interface StrategySession {
  date: Date;
  zoomLink: string;
  recordingUrl: string;
  googleCalendarLink?: string;
}

export interface ExploratoryAppointment {
    date: Date;
    googleCalendarLink?: string;
}

export interface SearchCriteria {
  nonNegotiables: string[];
  niceToHaves: string[];
  neighborhoodsOrZipCodes: string;
  mlsSearchUrl: string;
}

export interface BuyerDocument {
  id: string;
  title: string;
  file?: UploadedFile;
}

export interface ViewedHome {
  id: number;
  address: string;
  imageUrl: string;
  ranking: number;
  notes: string;
  price?: number;
  neighborhood?: string;
  mlsLink?: string;
  viewedDate: Date;
}

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  videoUrl?: string;
  status: 'complete' | 'upcoming' | 'current';
  time?: string;
  contingencyEndTime?: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  company?: string;
  phone: string;
  email: string;
}

export interface Vendor {
  id: string;
  name: string;
  service: string; // e.g., 'Lender', 'Inspector'
  company?: string;
  phone: string;
  email: string;
}

export interface Utility {
  id: string;
  name: string;
  url: string;
}

export interface PropertyDetails {
  address: string;
  purchasePrice: number;
  closingCosts: number;
  imageUrl: string;
}

export interface CoopAgent {
    name: string;
    email: string;
    phone: string;
    brokerage: string;
}

export interface TransactionCoordinator {
    name: string;
    email: string;
    phone: string;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export interface Agent {
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
}

export interface ActivityItem {
  id: string;
  timestamp: Date;
  text: string;
}


// --- SELLER SPECIFIC TYPES ---

export interface HomeWalkthrough {
  date: Date;
  googleCalendarLink?: string;
}

export interface ListingTimelineEvent {
  id: string;
  date: Date;
  title: string;
  status: 'complete' | 'upcoming' | 'current';
  vendorFormUrl?: string;
}

export interface RenovationTask {
  id: string;
  task: string;
  isComplete: boolean;
  category: string;
  responsibleParty: 'Agent' | 'Contractor' | 'Homeowner';
  invoice?: UploadedFile;
  photo?: UploadedFile;
}

export interface ListingPaperwork {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    previewFile?: UploadedFile;
}

export interface TeamMedia {
    photosUrl: string;
    videoUrl: string;
    mlsRemarks: string;
}

export interface Showing {
    id: string;
    date: Date;
    feedback: string;
    // Admin only fields
    agentName?: string;
    agentPhone?: string;
    agentEmail?: string;
}

export interface ComparableProperty {
    id: string;
    address: string;
    price: number;
    status: 'Active' | 'Pending' | 'Sold';
    url: string;
}

export interface ListingPerformance {
    listingUrl: string;
    compsPortalUrl?: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    yearBuilt: number;
    remarks: string;
    showings: Showing[];
    comparableProperties: ComparableProperty[];
    totalViews: {
        zillow: number;
        redfin: number;
        realtor: number;
        homes: number;
    };
}

export interface PropertyInfo {
    address: string;
    primaryPhotoUrl: string;
    walkthroughNotes: string;
    additionalPhotos: UploadedFile[];
}

export interface ListingDetails {
    publicRemarks: string;
    privateRemarks: string;
    googleDriveLink: string;
    photoGalleryLink: string;
    videoMediaLink: string;
}

export interface MarketingEvent {
  id: string;
  title: string;
  date: Date;
  description: string;
}

export interface Lockbox {
    id: string;
    serialNumber: string;
    cbsCode: string;
}

export interface MlsGenerationInputs {
    propertyInfo: string;
    clientNotes: string;
    customPrompt: string;
}

// --- TEMPLATE TYPES ---

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  attachment?: UploadedFile;
}

export interface TextTemplate {
  id: string;
  name: string;
  body: string;
}

export interface ListingPaperworkTemplate {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    previewFile?: UploadedFile;
}

export interface InvitationTemplates {
    buyer: {
        email: string;
        text: string;
    },
    seller: {
        email: string;
        text: string;
    }
}

export interface TimelineTemplateEvent {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
}


// --- BASE CLIENT DATA & DISCRIMINATED UNION ---

interface BaseClientData {
  id: string;
  clientName: string;
  clientType: ClientType;
  crmLink: string;
  clientEmails: string[];
  clientPhones: string[];
  intakeFormUrl: string;
  strategySession: StrategySession;
  contacts: Contact[];
  masterVendorList: Vendor[];
  utilities: Utility[];
  agent: Agent;
  recentActivity: ActivityItem[];
}

export interface BuyerClientData extends BaseClientData {
  clientType: 'Buyer';
  clientPhase: BuyerPhase;
  clientMotivation: string;
  exploratoryAppointment: ExploratoryAppointment;
  searchCriteria: SearchCriteria;
  documents: BuyerDocument[];
  viewedHomes: ViewedHome[];
  timeline: TimelineEvent[];
  propertyDetails: PropertyDetails;
  coopAgent: CoopAgent;
  transactionCoordinator?: TransactionCoordinator;
  buyerBookUrl?: string;
  buyerBookFile?: UploadedFile;
  purchaseAgreementPreviewFile?: UploadedFile;
  offerPrepContent: EducationalContent[];
  closedDate?: Date;
}

export interface SellerClientData extends BaseClientData {
  clientType: 'Seller';
  clientPhase: SellerPhase;
  propertyInfo: PropertyInfo;
  listingDetails: ListingDetails;
  homeWalkthrough: HomeWalkthrough;
  listingTimeline: ListingTimelineEvent[];
  renovationTasks: RenovationTask[];
  photoPrepContent: string[]; // Simple list of strings for the checklist
  listingPaperwork: ListingPaperwork[];
  teamMedia: TeamMedia;
  listingPerformance: ListingPerformance;
  marketingEvents: MarketingEvent[];
  // Under Contract
  underContractTimeline: TimelineEvent[];
  contractDetails: PropertyDetails;
  contractDocuments: BuyerDocument[];
  // New logistical details
  assignedLockboxId?: string;
  signInstallerInfo: {
    vendorId?: string;
    formUrl?: string;
  };
  mlsGenerationInputs: MlsGenerationInputs;
  closedDate?: Date;
}

export type ClientData = BuyerClientData | SellerClientData;