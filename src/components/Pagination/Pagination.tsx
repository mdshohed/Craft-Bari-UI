import { Pagination } from "antd";
import { IPagination } from "../../types/setup";

type IProps = {
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
}

export default function MetaPagination({pagination, setPagination}: IProps) {
  const handlePageChange = (page: number, pageSize: number = 10) => {
    setPagination({...pagination, page: page, limit: pageSize});
  };
  return (
    <div className="py-5">
      <Pagination
        align="center"
        // defaultCurrent={1}
        current={pagination?.page}
        pageSize={pagination?.limit}
        total={pagination?.total}
        onChange={handlePageChange}
        // showSizeChanger
        onShowSizeChange={handlePageChange}
      />  
    </div>
  )
}


// const [pagination, setPagination] = useState<IPagination>({} as IPagination);
//   const { data: categories, isLoading } = useGetAllDataQuery({
//     page: pagination.page || 1,
//     limit: pagination.limit || 10,
//     sort: ''
//   });
// <MetaPagination setPagination={setPagination} pagination={pagination}></MetaPagination>
// query: (params, data?: Record<string, any>) => {
//   const queryString = new URLSearchParams(params).toString();