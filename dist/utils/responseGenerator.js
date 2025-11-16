"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = generateResponse;
exports.adjustTone = adjustTone;
function generateResponse({ rating, brandVoice, contact = '[contact]' }) {
    let baseResponse = '';
    if (rating === 5) {
        baseResponse = "Thank you for the wonderful feedback! We're thrilled you had a great experience.";
    }
    else if (rating === 4) {
        baseResponse = "Thank you for your review! We appreciate your feedback and are always working to improve.";
    }
    else if (rating === 3) {
        baseResponse = `Thank you for your feedback. We'd love to hear more about your experience. Please contact us at ${contact}.`;
    }
    else if (rating === 1 || rating === 2) {
        baseResponse = `We sincerely apologize for your experience. This is not up to our standards. Please contact us directly at ${contact} so we can make this right.`;
    }
    else {
        baseResponse = "Thank you for your review. We appreciate your feedback.";
    }
    // Add sign-off if exists
    if (brandVoice?.signOff) {
        baseResponse += `\n\n${brandVoice.signOff}`;
    }
    return baseResponse;
}
function adjustTone(text, tone = 'professional') {
    // Simple tone adjustments (without AI)
    if (tone === 'friendly') {
        return text.replace(/Thank you/g, 'Thanks').replace(/We sincerely apologize/g, "We're really sorry");
    }
    else if (tone === 'casual') {
        return text.replace(/Thank you/g, 'Thanks').replace(/We sincerely apologize/g, "We're really sorry").replace(/Please contact us/g, 'Just reach out to us');
    }
    // Professional is the default
    return text;
}
