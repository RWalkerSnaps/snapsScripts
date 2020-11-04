const filteredData = []

for (let i = 0; i < macros.length; i += 1) {
  const macro = macros[i]
  const filteredMacro = {
    id: macro.id,
    title: macro.title,
    description: macro.description,
    active: macro.active,
  }
  
  for (let k = 0; k < macro.actions.length; k += 1) {
      if (macro.actions[k].field ===  "comment_value_html") {
          filteredMacro.comment_value_html = macro.actions[k].value;
          filteredMacro.comment_value_html_clean = striptags(macro.actions[k].value, ['b'], '\n'); //'p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'li'
          filteredMacro.comment_value_html_clean = filteredMacro.comment_value_html_clean.replace(/<b>/g, '[[');
          filteredMacro.comment_value_html_clean = filteredMacro.comment_value_html_clean.replace(/<\/b>/g, ']]');
          filteredMacro.comment_value_html_clean = filteredMacro.comment_value_html_clean.replace(/\n\s*\n/g, '\n\n');
          filteredMacro.comment_value_html_clean = filteredMacro.comment_value_html_clean.replace(/[\u2018\u2019]/g, "")

      } else if (macro.actions[k].field === "comment_value"){
        filteredMacro.comment_value = macro.actions[k].value
      }
  }
  filteredMacro.link = 'https://mybobs1575316646.zendesk.com/agent/admin/macros/' + macro.id
  filteredData.push(filteredMacro)
}

csvWriter
  .writeRecords(filteredData)
  .then(()=> console.log('The CSV file was written successfully'));
