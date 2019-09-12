using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OnboardTask.Models;

namespace OnboardTask.Controllers
{
    public class SalesController : Controller
    {
        private readonly Batch1Context _context;

        public SalesController(Batch1Context context)
        {
            _context = context;
        }

        // GET: Sales
        public JsonResult Index()
        {
            var sList = _context.Sales.Select(s => new
            {
                SalesId = s.SalesId,
                DateSold = s.DateSold,
                CustomerId = s.Customer.CustomerId,
                CustomerName = s.Customer.CustomerName,
                ProductId = s.Product.ProductId,
                ProductName = s.Product.ProductName,
                StoreId = s.Store.StoreId,
                StoreName = s.Store.StoreName
            });
            return Json(sList.ToList());
        }

        // GET: Sales/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sales = await _context.Sales
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .FirstOrDefaultAsync(m => m.SalesId == id);
            if (sales == null)
            {
                return NotFound();
            }

            return Json(sales);
        }

        // GET: Sales/Create
        public IActionResult Create()
        {
            ViewData["CustomerId"] = new SelectList(_context.Customer, "CustomerId", "CustomerName");
            ViewData["ProductId"] = new SelectList(_context.Product, "ProductId", "ProductName");
            ViewData["StoreId"] = new SelectList(_context.Store, "StoreId", "StoreName");
            return Json(_context.Sales);
        }

        // POST: Sales/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] Sales sales)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sales);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "CustomerId", "CustomerName", sales.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "ProductId", "ProductName", sales.ProductId);
            ViewData["StoreId"] = new SelectList(_context.Store, "StoreId", "StoreName", sales.StoreId);
            return Json(sales);
        }

        // GET: Sales/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "CustomerId", "CustomerName", sales.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "ProductId", "ProductName", sales.ProductId);
            ViewData["StoreId"] = new SelectList(_context.Store, "StoreId", "StoreName", sales.StoreId);
            return Json(sales);
        }

        // POST: Sales/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [FromBody] Sales sales)
        {
            if (id != sales.SalesId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sales);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SalesExists(sales.SalesId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "CustomerId", "CustomerName", sales.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "ProductId", "ProductName", sales.ProductId);
            ViewData["StoreId"] = new SelectList(_context.Store, "StoreId", "StoreName", sales.StoreId);
            return Json(sales);
        }

        // GET: Sales/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sales = await _context.Sales
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .FirstOrDefaultAsync(m => m.SalesId == id);
            if (sales == null)
            {
                return NotFound();
            }

            return Json(sales);
        }

        // POST: Sales/Delete/5
        [HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.SalesId == id);
        }
    }
}