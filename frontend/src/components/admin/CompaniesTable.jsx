import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Edit2, MoreHorizontal, Building2 } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const CompaniesTable = () => {
  const { companies = [] } = useSelector((store) => store.company || {})
  const { searchCompanyByText } = useSelector((store) => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase())
      })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl overflow-hidden">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Registered Companies</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <TableCaption className="text-gray-600 text-sm">
            A list of your recently registered companies.
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow className="text-gray-700">
              <TableHead className="p-3">Logo</TableHead>
              <TableHead className="p-3">Name</TableHead>
              <TableHead className="p-3">Date</TableHead>
              <TableHead className="p-3 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan="4" className="text-center py-4 text-gray-500">
                  You haven't registered any companies yet.
                </TableCell>
              </TableRow>
            ) : (
              filterCompany.map((company) => (
                <TableRow
                  key={company._id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <TableCell className="p-3">
                    <Avatar className="w-10 h-10 border border-gray-300 flex items-center justify-center">
                      {company.logo ? (
                        <AvatarImage
                          src={company.logo}
                          alt="Company Logo"
                          className="rounded-full"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-gray-500" />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="p-3 font-medium text-gray-700">
                    {company.name}
                  </TableCell>
                  <TableCell className="p-3 text-gray-600">
                    {company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="p-3 text-right">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded-full hover:bg-gray-200 transition">
                        <MoreHorizontal className="text-gray-700" />
                      </PopoverTrigger>
                      <PopoverContent className="w-40 bg-white shadow-md rounded-lg p-2">
                        <button
                          onClick={() => navigate(`/admin/companies/create/${company._id}`)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CompaniesTable
