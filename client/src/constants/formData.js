const DEFAULT_FORM_DATA = {
  date: new Date().toISOString().substring(0, 10),
  body: "",
  sleep: 0,
  exercise: 0,
  nature: 0,
  social: 0,
  mindful: 0,
  nutrition: 0,
  mental: 0,
  therapy: false,
}

export { DEFAULT_FORM_DATA };
