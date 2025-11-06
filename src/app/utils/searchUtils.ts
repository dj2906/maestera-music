export function filterFAQs(faqs: { question: string; answer: string }[], query: string) {
  if (!query.trim()) return faqs;
  const lowerQuery = query.toLowerCase();
  return faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
  );
}
