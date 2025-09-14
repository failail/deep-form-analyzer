// Wrong (causes the error)
{question.options}

// Right 
{question.options?.map(option => (
  <label key={option.value}>
    <input type="radio" value={option.value} />
    {option.label}
  </label>
))}