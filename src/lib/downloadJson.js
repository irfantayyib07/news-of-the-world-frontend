export function downloadJSON(data, filename, country, category) {
 let newData = { ... data };
 delete newData.status;
 delete newData.totalResults;
 newData.category = category;
 newData.country = country;
 const articles = newData.articles;
 const fileData = {
  data: {
   category: newData.category,
   country: newData.country,
   articles,
  }
 }
 const jsonStr = JSON.stringify(fileData, null, 2); // Stringify with indentation
 const blob = new Blob([jsonStr], { type: 'text/plain' });

 const link = document.createElement('a');
 link.href = URL.createObjectURL(blob);
 link.download = filename;
 link.click();

 // Revoke the object URL to avoid memory leaks
 URL.revokeObjectURL(link.href);
}