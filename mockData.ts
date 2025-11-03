
import { ClientData, BuyerClientData, SellerClientData, Lockbox, InvitationTemplates, ListingPaperworkTemplate, TimelineTemplateEvent } from '../types';

const today = new Date();
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const mockLockboxes: Lockbox[] = [
    { id: 'lb-1', serialNumber: 'XF-12345', cbsCode: '9876' },
    { id: 'lb-2', serialNumber: 'XF-67890', cbsCode: '5432' },
    { id: 'lb-3', serialNumber: 'AB-45678', cbsCode: '1122' },
];

export const mockMasterListingPaperwork: ListingPaperworkTemplate[] = [
    { id: 'm-lp1', title: 'Exclusive Listing Agreement', description: "This document authorizes us to market and sell your home.", videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 'm-lp2', title: "Seller's Property Disclosure", description: "This is your opportunity to disclose any known issues with the property.", videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 'm-lp3', title: 'Lead-Based Paint Exhibit', description: 'Required for homes built before 1978.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'},
    { id: 'm-lp4', title: 'Community Association Disclosure', description: 'If your home is part of an HOA, this provides details to the buyer.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'},
];

export const mockInvitationTemplates: InvitationTemplates = {
    buyer: {
        email: "Hello [Client Name],\n\nWelcome to your personal home buying portal! We're excited to have you on board. You can use this portal to track every step of our journey together.\n\nClick here to get started: [Portal Link]\n\nBest,\n[Agent Name]",
        text: "Hi [Client Name]! Welcome to your home buying portal. You can access it here to track our progress: [Portal Link]"
    },
    seller: {
        email: "Hello [Client Name],\n\nWelcome to your home selling portal! This will be our central hub for everything from market prep to closing day.\n\nClick here to get started: [Portal Link]\n\nBest,\n[Agent Name]",
        text: "Hi [Client Name]! Your home selling portal is ready. Access it any time to see our progress: [Portal Link]"
    }
};

export const mockBuyerTimelineTemplates: TimelineTemplateEvent[] = [
    { id: 'btt1', title: 'Offer Accepted!', description: 'Congratulations, your offer was accepted!', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 'btt2', title: 'Home Inspection', description: 'A licensed inspector will check the property.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 'btt3', title: 'Appraisal Contingency', description: "The bank's appraisal must meet or exceed the sale price.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 'btt4', title: 'Financing Contingency', description: 'Final loan approval from the lender is due.', videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 'btt5', title: 'Closing Day!', description: "The final step! You'll sign the papers and get the keys.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export const mockSellerPreListTimelineTemplates: TimelineTemplateEvent[] = [
    { id: 'sptt1', title: 'Paperwork Signed', description: 'All initial listing documents are signed.' },
    { id: 'sptt2', title: 'Sign Install', description: 'The "For Sale" sign will be installed in your yard.' },
    { id: 'sptt3', title: 'Pre-List Renovations', description: 'Time to complete any agreed-upon repairs or updates.' },
    { id: 'sptt4', title: 'Staging', description: 'The home will be professionally staged to appeal to buyers.' },
    { id: 'sptt5', title: 'Photos & Media', description: 'Professional photos, videos, and virtual tours will be created.' },
    { id: 'sptt6', title: 'MLS Prep', description: 'We are preparing your listing for the Multiple Listing Service.' },
    { id: 'sptt7', title: 'Go Live!', description: 'Your home is officially on the market!' },
];
export const mockSellerTransactionTimelineTemplates: TimelineTemplateEvent[] = [
    { id: 'stt1', title: 'Offer Accepted', description: 'Congratulations! We have an accepted offer.' },
    { id: 'stt2', title: "Buyer's Home Inspection", description: "The buyer's inspector will visit the property." },
    { id: 'stt3', title: 'Appraisal', description: "The buyer's lender will send an appraiser to the property." },
    { id: 'stt4', title: 'Closing Day!', description: 'All documents will be signed and the sale will be complete.' },
];


const mockBuyerClients: BuyerClientData[] = [
  {
    id: "client-1",
    clientName: "Jane & John Doe (Buyer)",
    clientType: "Buyer",
    crmLink: "https://www.followupboss.com/",
    clientPhase: 'Under Contract',
    clientEmails: ["jane.doe@email.com", "john.doe@email.com"],
    clientPhones: ["555-111-2222", "555-333-4444"],
    intakeFormUrl: "https://form.jotform.com/220305373500038",
    clientMotivation: "Moving to be closer to their grandchildren. They want a safe, quiet neighborhood with a yard for the kids and their two dogs to play in. A home office is crucial for Jane's remote work.",
    strategySession: {
      date: new Date('2024-08-15T14:00:00Z'),
      zoomLink: "https://zoom.us/j/1234567890",
      recordingUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategy+Session&dates=20240815T180000Z/20240815T190000Z&details=Your+home+buying+strategy+session",
    },
    exploratoryAppointment: {
      date: new Date('2024-08-20T10:00:00Z'),
      googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Exploratory+Appointment&dates=20240820T140000Z/20240820T150000Z&details=Let's+go+see+some+homes!",
    },
    searchCriteria: {
      nonNegotiables: ["3+ Bedrooms", "2+ Bathrooms", "Fenced Yard", "Home Office Space"],
      niceToHaves: ["Finished Basement", "Pool", "Walk-in Closet"],
      neighborhoodsOrZipCodes: "West Side, Downtown\n62704, 62702",
      mlsSearchUrl: "https://www.realtor.com/",
    },
    documents: [
      { id: 'doc1', title: "Buyer Brokerage Agreement", file: { name: "BBA_Signed_JDoe.pdf", url: "#" } },
      { id: 'doc2', title: "Binding Agreement", file: { name: "PSA_456_Oak_Ave.pdf", url: "#" } },
      { id: 'doc3', title: "Disclosures" },
      { id: 'doc4', title: "Inspection Report" },
      { id: 'doc5', title: "Amendments" },
    ],
    viewedHomes: [
      { id: 1, address: "123 Maple Street, Springfield, IL", price: 350000, neighborhood: "West Side", mlsLink: "https://www.realtor.com/", imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop", ranking: 7, notes: "Loved the kitchen, but the yard is a bit small.", viewedDate: new Date('2024-08-22T10:00:00Z') },
      { id: 2, address: "456 Oak Avenue, Shelbyville, IL", price: 450000, neighborhood: "Downtown", mlsLink: "https://www.realtor.com/", imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop", ranking: 10, notes: "This could be the one! The backyard is perfect for the dogs.", viewedDate: new Date('2024-08-25T15:00:00Z') },
    ],
    timeline: [
      { id: 't1', date: addDays(today, -10), title: "Offer Accepted!", description: "Congratulations, your offer on 456 Oak Avenue was accepted!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", status: 'complete' },
      { id: 't2', date: addDays(today, -9), title: "Under Contract", description: "All parties have signed the purchase agreement.", status: 'complete' },
      { id: 't3', date: addDays(today, -5), title: "Home Inspection", description: "A licensed inspector will check the property.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", status: 'complete', time: '10:00 AM' },
      { id: 't4', date: addDays(today, 1), title: "Due Diligence Ends", description: "Final day to address inspection items and back out without penalty.", status: 'current', contingencyEndTime: '5:00 PM' },
      { id: 't5', date: addDays(today, 10), title: "Appraisal Contingency", description: "The bank's appraisal must meet or exceed the sale price.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", status: 'upcoming' },
      { id: 't6', date: addDays(today, 20), title: "Financing Contingency", description: "Final loan approval from the lender is due.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", status: 'upcoming' },
      { id: 't7', date: addDays(today, 25), title: "Closing Day!", description: "The final step! You'll sign the papers and get the keys.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", status: 'upcoming', time: '2:00 PM' },
    ],
    contacts: [
      { id: 'c1', name: "Alice Lender", role: "Loan Officer", company: "Secure Bank", phone: "555-123-4567", email: "alice@securebank.com" },
      { id: 'c2', name: "Bob Attorney", role: "Closing Attorney", company: "Lawful Closings LLC", phone: "555-987-6543", email: "bob@lawfulclosings.com" },
    ],
    masterVendorList: [
        { id: 'v1', name: "Alice Lender", service: "Lender", company: "Secure Bank", phone: "555-123-4567", email: "alice@securebank.com" },
        { id: 'v2', name: "Larry The Lender", service: "Lender", company: "Mortgage Pro", phone: "555-111-2222", email: "larry@mortgagepro.com" },
    ],
    utilities: [
      { id: 'u1', name: 'City Water & Light', url: 'https://www.cwlp.com/' },
      { id: 'u2', name: 'Ameren Gas', url: 'https://www.ameren.com/' },
      { id: 'u3', name: 'Republic Services (Trash)', url: 'https://www.republicservices.com/' },
    ],
    propertyDetails: {
      address: "456 Oak Avenue, Shelbyville",
      purchasePrice: 450000,
      closingCosts: 8500,
      imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
    },
    coopAgent: { name: "Susan Seller", email: "susan@competitorrealty.com", phone: "555-333-4444", brokerage: "Competitor Realty" },
    transactionCoordinator: { name: "Tom Coordinator", email: "tom@competitorrealty.com", phone: "555-333-5555" },
    buyerBookUrl: "https://www.nar.realtor/your-home/a-buyers-guide",
    purchaseAgreementPreviewFile: { name: "Example_PSA.pdf", url: "#"},
    offerPrepContent: [
      { id: "op1", title: "What is the Due Diligence Period?", description: "This is a crucial timeframe for the buyer to conduct inspections and investigations on the property.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "op2", title: "What is Earnest Money?", description: "Earnest money is a deposit made to a seller that represents a buyer's good faith to buy a home.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    agent: { name: "Your Awesome Agent", email: "agent@homewardbound.com", phone: "555-AGENT-NOW", photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    recentActivity: [],
  },
  {
    id: "client-2",
    clientName: "Peter Parker (Buyer)",
    clientType: "Buyer",
    crmLink: "https://www.followupboss.com/",
    clientPhase: 'Closed',
    closedDate: new Date('2024-10-01T16:00:00Z'),
    clientEmails: ["peter.parker@email.com", ""],
    clientPhones: ["555-867-5309", ""],
    intakeFormUrl: "https://form.jotform.com/220305373500038",
    clientMotivation: "Needs a place with high ceilings and strong anchor points. Proximity to the Daily Bugle is a plus, but privacy is paramount. Trying to find a balance between his personal life and... other responsibilities.",
    strategySession: {
      date: new Date('2024-09-01T18:00:00Z'),
      zoomLink: "https://zoom.us/j/0987654321",
      recordingUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategy+Session&dates=20240901T180000Z/20240901T190000Z",
    },
    exploratoryAppointment: {
      date: new Date('2024-09-05T10:00:00Z'),
      googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Exploratory+Appointment&dates=20240905T140000Z/20240905T150000Z",
    },
    searchCriteria: {
      nonNegotiables: ["High Ceilings", "Good for Webs", "Close to Daily Bugle"],
      niceToHaves: ["Secret Lair", "Views of the City"],
      neighborhoodsOrZipCodes: "Midtown, Manhattan\n10001, 10018",
      mlsSearchUrl: "https://www.realtor.com/",
    },
    documents: [
      { id: 'doc-final-1', title: "Binding Agreement", file: { name: "Binding_Agreement_Parker.pdf", url: "#" } },
      { id: 'doc-final-2', title: "Inspection Report", file: { name: "Inspection_Report_Parker.pdf", url: "#" } },
      { id: 'doc-final-3', title: "Settlement Statement", file: { name: "Settlement_Statement_Parker.pdf", url: "#" } },
    ],
    viewedHomes: [
      { id: 1, address: "1 Forest Hills Drive, Queens, NY", price: 550000, neighborhood: "Forest Hills", mlsLink: "https://www.realtor.com/", imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop", ranking: 8, notes: "Aunt May would have loved it.", viewedDate: new Date('2024-09-06T11:00:00Z') },
    ],
    timeline: [],
    contacts: [
        { id: 'c3', name: "Matt Murdock", role: "Closing Attorney", company: "Nelson, Murdock, and Page", phone: "555-DARE-DVL", email: "matt@nmp.com" },
    ],
    masterVendorList: [],
    utilities: [
        { id: 'u1', name: 'Con Edison', url: 'https://www.coned.com/' },
        { id: 'u2', name: 'National Grid (Gas)', url: 'https://www.nationalgridus.com/' },
    ],
    propertyDetails: { address: "1 Forest Hills Drive, Queens, NY", purchasePrice: 550000, closingCosts: 12000, imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop" },
    coopAgent: { name: "", email: "", phone: "", brokerage: "" },
    buyerBookFile: { name: "Buyer_Guide_2024.pdf", url: "#" },
    offerPrepContent: [
      { id: "op1", title: "What is Due Diligence?", description: "This is a crucial timeframe for the buyer to conduct inspections.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "op2", title: "What is Earnest Money?", description: "Earnest money is a deposit made to a seller.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    agent: { name: "Your Awesome Agent", email: "agent@homewardbound.com", phone: "555-AGENT-NOW", photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    recentActivity: [],
  }
];

const mockSellerClient: SellerClientData = {
    id: "client-3",
    clientName: "Tony Stark (Seller)",
    clientType: "Seller",
    crmLink: "https://www.followupboss.com/",
    clientPhase: 'Live on MLS',
    closedDate: undefined,
    clientEmails: ["tony.stark@starkindustries.com", ""],
    clientPhones: ["555-IRON-MAN", ""],
    intakeFormUrl: "https://form.jotform.com/seller-intake",
    strategySession: {
        date: new Date('2024-11-01T10:00:00Z'),
        zoomLink: "https://zoom.us/j/1122334455",
        recordingUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategy+Session",
    },
    propertyInfo: {
        address: "10880 Malibu Point, 90265",
        primaryPhotoUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
        walkthroughNotes: "Main selling point is the arc reactor in the basement. View of the Pacific is incredible. Needs some minor touch-ups in the west wing after the last party. JARVIS system to be uninstalled pre-closing.",
        additionalPhotos: [],
    },
    listingDetails: {
        publicRemarks: "Live like a hero in this stunning cliffside estate with unparalleled ocean views. This architectural marvel boasts state-of-the-art technology, expansive entertaining spaces, and a workshop fit for a genius. A once-in-a-lifetime opportunity.",
        privateRemarks: "Seller is highly motivated. Please provide 24-hour notice for showings. Do not touch any of the suits of armor. Seriously.",
        googleDriveLink: "https://docs.google.com/folder/d/123",
        photoGalleryLink: "https://photos.google.com/album/123",
        videoMediaLink: "https://www.youtube.com/watch?v=123",
    },
    homeWalkthrough: {
        date: new Date('2024-11-05T14:00:00Z'),
        googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Home+Walkthrough",
    },
    listingTimeline: [
        { id: 'lt-paperwork', date: addDays(today, -30), title: "Paperwork Signed", status: 'complete'},
        { id: 'lt0', date: addDays(today, -20), title: "Sign Install", status: 'complete', vendorFormUrl: 'https://signinstall.com/order' },
        { id: 'lt1', date: addDays(today, -15), title: "Pre-List Renovations", status: 'complete'},
        { id: 'lt-staging', date: addDays(today, -12), title: "Staging", status: 'complete'},
        { id: 'lt2', date: addDays(today, -10), title: "Photos & Media", status: 'complete'},
        { id: 'lt3', date: addDays(today, -8), title: "MLS Prep", status: 'complete'},
        { id: 'lt4', date: addDays(today, -7), title: "Go Live!", status: 'current'},
    ],
    renovationTasks: [
        { id: 'rt1', task: "Repaint guest bedroom", category: "Interior", isComplete: true, responsibleParty: 'Contractor', photo: { name: 'bedroom.jpg', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16433d?q=80&w=2070&auto=format&fit=crop'} },
        { id: 'rt2', task: "Update kitchen cabinet hardware", category: "Kitchen", isComplete: true, responsibleParty: 'Homeowner', invoice: { name: 'hardware_invoice.pdf', url: '#' } },
    ],
    photoPrepContent: [
        "Declutter all surfaces (kitchen counters, tables, desks).",
        "Remove personal photos and magnets from the refrigerator.",
    ],
    listingPaperwork: [
        { id: 'lp1', title: 'Exclusive Listing Agreement', description: "This document authorizes us to market and sell your home.", videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', previewFile: { name: 'Listing_Agreement_Example.pdf', url: '#'}},
        { id: 'lp2', title: "Seller's Property Disclosure", description: "This is your opportunity to disclose any known issues with the property.", videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', previewFile: { name: 'Seller_Disclosure_Example.pdf', url: '#'}},
    ],
    teamMedia: {
        photosUrl: "https://photos.google.com/album/123",
        videoUrl: "https://www.youtube.com/watch?v=123",
        mlsRemarks: "Live like a hero in this stunning cliffside estate...",
    },
    listingPerformance: {
        listingUrl: "https://www.zillow.com/homedetails/10880-Malibu-Point-Malibu-CA-90265/20542385_zpid/",
        compsPortalUrl: "https://www.realtor.com/soldhomeprices/Malibu_CA",
        price: 117000000,
        bedrooms: 4,
        bathrooms: 6,
        sqft: 25000,
        yearBuilt: 2007,
        remarks: "Stunning cliffside estate with unparalleled ocean views. A once-in-a-lifetime opportunity.",
        totalViews: { zillow: 15234, redfin: 9876, realtor: 11234, homes: 4567 },
        showings: [
            { id: 's1', date: addDays(today, -5), feedback: 'Incredible views, but the workshop is a bit much.', agentName: 'Steve Rogers', agentPhone: '555-CAP-AMCA', agentEmail: 'steve@shield.gov' },
            { id: 's2', date: addDays(today, -4), feedback: 'They loved the technology but are concerned about the upkeep cost.', agentName: 'Natasha Romanoff', agentPhone: '555-WIDOW', agentEmail: 'nat@shield.gov' },
        ],
        comparableProperties: [
            { id: 'c1', address: '123 Ocean Drive, Malibu', price: 95000000, status: 'Active', url: '#'},
        ]
    },
    marketingEvents: [
        { id: 'me1', date: addDays(today, -6), title: 'Open House', description: 'Public open house from 1pm to 4pm.' },
        { id: 'me2', date: addDays(today, -5), title: 'Agent Caravan', description: 'Exclusive tour for local real estate agents.' },
    ],
    underContractTimeline: [
        { id: 'uct1', date: addDays(today, -2), title: "Offer Accepted", description: "Congratulations!", status: 'complete' },
        { id: 'uct2', date: addDays(today, 1), title: "Home Inspection", description: "Buyer's inspector will visit the property.", status: 'current' },
        { id: 'uct3', date: addDays(today, 8), title: "Appraisal", description: "The buyer's lender will appraise the property.", status: 'upcoming' },
    ],
    contractDetails: {
        address: "10880 Malibu Point, 90265",
        purchasePrice: 115000000,
        closingCosts: 2300000,
        imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
    },
    contractDocuments: [
        { id: 'cd1', title: "Binding Agreement", file: { name: "PSA_Malibu.pdf", url: "#" } },
        { id: 'cd2', title: "Buyer Pre-Approval", file: { name: "PreApproval_Buyer.pdf", url: "#" } },
    ],
    assignedLockboxId: 'lb-1',
    signInstallerInfo: {
        vendorId: 'v-s3', // You'd add a sign installer to the master list
        formUrl: 'https://signinstall.com/order'
    },
    mlsGenerationInputs: {
        propertyInfo: '4 bed, 6 bath, 25000 sqft, built 2007. Ocean views, smart home tech, large workshop.',
        clientNotes: 'Main selling point is the workshop and the view. Seller is a tech genius. Highly motivated.',
        customPrompt: 'Write exciting and luxurious MLS remarks. Emphasize the technology and the unique cliffside location. Mention it is fit for a hero.'
    },

    contacts: [],
    masterVendorList: [
        { id: 'v-s1', name: "Clean Slate Staging", service: "Stager", phone: "555-STAGE-IT", email: "contact@cleanslate.com" },
        { id: 'v-s2', name: "Picture Perfect Photos", service: "Photographer", phone: "555-CLICK-IT", email: "booking@pictureperfect.com" },
        { id: 'v-s3', name: "Speedy Signs", service: "Sign Installer", phone: "555-SIGN-UP", email: "orders@speedysigns.com" },
    ],
    utilities: [
      { id: 'u-s1', name: 'Malibu Water Dept.', url: '#' },
      { id: 'u-s2', name: 'SoCal Edison', url: '#' },
    ],
    agent: { name: "Your Awesome Agent", email: "agent@homewardbound.com", phone: "555-AGENT-NOW", photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    recentActivity: [
        { id: 'act1', timestamp: addDays(today, -1), text: 'You updated the MLS remarks.' },
        { id: 'act2', timestamp: addDays(today, -2), text: 'New photos were added to the media hub.' },
        { id: 'act3', timestamp: addDays(today, -3), text: 'Renovation task "Repaint guest bedroom" was marked complete.' },
    ],
};

export const mockClients: ClientData[] = [...mockBuyerClients, mockSellerClient];