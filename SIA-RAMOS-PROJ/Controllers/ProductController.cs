using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using SIA_RAMOS_PROJ.Models;

namespace SIA_RAMOS_PROJ.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public ProductController()
        {
            string projectId = "sia-api-2cbe3";
            _firestoreDb = FirestoreDb.Create(projectId);
        }

       
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = new List<Product>();
            var snapshot = await _firestoreDb.Collection("products").GetSnapshotAsync();
            foreach (var doc in snapshot.Documents)
            {
                var product = doc.ConvertTo<Product>();
                product.Id = doc.Id; 
                products.Add(product);
            }
            return Ok(products);
        }

       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            var docRef = _firestoreDb.Collection("products").Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
                return NotFound("Product not found");

            var product = snapshot.ConvertTo<Product>();
            product.Id = snapshot.Id; 
            return Ok(product);
        }

      
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            var docRef = _firestoreDb.Collection("products").Document();
            await docRef.SetAsync(product);
            product.Id = docRef.Id; 
            return Ok(product); 
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] Product updatedProduct)
        {
            var docRef = _firestoreDb.Collection("products").Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
                return NotFound("Product not found");

            updatedProduct.Id = id; 
            await docRef.SetAsync(updatedProduct, SetOptions.Overwrite);
            return Ok("Product updated");
        }

     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var docRef = _firestoreDb.Collection("products").Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
                return NotFound("Product not found");

            await docRef.DeleteAsync();
            return Ok("Product deleted");
        }
    }
}
