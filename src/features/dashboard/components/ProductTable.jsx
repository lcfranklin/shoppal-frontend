import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Pencil, Trash2, ReceiptText } from "lucide-react"

export function ProductTable({ products, onRecordSale, onEdit, onDelete }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
        <CardDescription>
          List of all products, current stock levels, and sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="group">
                <TableCell className="font-semibold">
                  <div className="flex flex-col">
                    <span>{product.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{product.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={product.stockQuantity > 0 ? "outline" : "destructive"}>
                    {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {product.category || 'Uncategorized'}
                  </Badge>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <span className={cn(
                    "font-mono",
                    product.stockQuantity < 10 ? "text-destructive font-bold" : "text-muted-foreground"
                  )}>
                    {product.stockQuantity}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {product.stockQuantity > 0 ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onRecordSale(product)}
                      >
                        <ReceiptText className="mr-1.5 h-3.5 w-3.5" />
                        Record Sale
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onEdit(product)}
                        >
                          <Pencil className="mr-1.5 h-3.5 w-3.5" />
                          Update
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onDelete(product.id)}
                        >
                          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>


        </Table>
      </CardContent>
    </Card>
  )
}
