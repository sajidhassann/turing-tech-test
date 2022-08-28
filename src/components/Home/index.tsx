import {FC, useCallback, useEffect, useMemo, useState} from "react";
import GQLCalls from "../../gqlCalls";
import {Button, Dropdown, Menu, Space, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import Call from "../../Models/call.model";
import {DownOutlined} from "@ant-design/icons";

type common = { [key: string]: string }

const callType: common = {
    missed: 'red',
    voicemail: 'blue',
    answered: 'green'
}

const status: common = {
    'true': 'blue',
    'false': 'green'
}

const direction: common = {
    'inbound': 'arrow-bottom-left',
    'outbound': 'arrow-top-right'
}


const Home: FC = () => {

    const [callsData, setCallsData] = useState<Call[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [totalCalls, setTotalCalls] = useState<number>(0)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('0')

    const columns: ColumnsType<Call> = useMemo(() => [
        {
            title: 'Call Type',
            dataIndex: 'callType',
            key: 'callType',
            render: (text: string) => <span className={[callType[text], 'text-capitalize'].join(' ')}>{text}</span>,

        }, {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'direction',
            render: (text: string) => <span className="text-capitalize blue direction-col">{text} <i
                className={direction[text]}/></span>,
        }, {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        }, {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        }, {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        }, {
            title: 'Via',
            dataIndex: 'via',
            key: 'via',
        }, {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        }, {
            title: 'Status',
            dataIndex: 'isArchived',
            key: 'isArchived',
            render: (isArchived: boolean) => <Tag
                color={status[String(isArchived)]}>{isArchived ? 'Archived' : 'Unarchived'}</Tag>,
        }, {
            title: 'Actions',
            dataIndex: '',
            key: '',
            render: (item: Call) => {
                return <div className="actions">
                    <Button>View</Button> {/* Left by choice got exhausted */}
                    <Button
                        onClick={async () => {
                            try {
                                const newCall = await GQLCalls.archiveCall(item.id)
                                setCallsData((calls) => calls.map((item) => item.id === newCall.id ? new Call(newCall) : item))
                            } catch (err) {
                                console.log(err)
                            }
                        }
                        }>{item.isArchived ? 'UnArchive' : 'Archive'}</Button>
                </div>
            },
        },
    ], [])

    const loadCalls = useCallback(async (offset: number = 0, limit: number = 10) => {
        setLoading(true)
        try {
            const data = await GQLCalls.getCalls({offset, limit})
            const calls = data.nodes.map((item) => new Call(item))
            // const groupedByDate = calls.reduce((map: { [key: string]: Call[] }, call) => {
            //     if (map[call.createdAt]) {
            //         map[call.createdAt].push(call)
            //     } else {
            //         map[call.createdAt] = [call]
            //     }
            //     return map
            // }, {}) // Calls Grouped By Date
            setCallsData(calls)
            setTotalCalls(data.totalCount)
        } catch (err) {
            console.log({err})
        }
        setLoading(false)
    }, [])

    const onPageChange = useCallback((page: number, pageSize: number) => {
        loadCalls((page - 1) * pageSize)
    }, [])

    useEffect(() => {
        loadCalls()
    }, [])

    const archivedData = useMemo(() => callsData.filter((item) => item.isArchived), [callsData])
    const unarchivedData = useMemo(() => callsData.filter((item) => !item.isArchived), [callsData])

    const menu = useMemo(() => <Menu
            items={[
                {
                    label: 'All',
                    key: '0',
                    className: filter === '0' ? 'filter' : '',
                    onClick: () => setFilter('0')
                },
                {
                    label: 'Archived',
                    key: '1',
                    className: filter === '1' ? 'filter' : '',
                    onClick: () => setFilter('1')
                },
                {
                    label: 'Unarchived',
                    key: '2',
                    className: filter === '2' ? 'filter' : '',
                    onClick: () => setFilter('2')
                },
            ]}
        />
        , [filter]);

    const displayData = useCallback(() => {
        switch (filter) {
            case '0':
                return callsData
            case '1':
                return archivedData
            case '2':
                return unarchivedData
        }
    }, [callsData, archivedData, unarchivedData, filter])

    return <div className="home-page">
        <div className="mb-3">
            <span className="me-1">
                Filter by:
            </span>
            <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={e => e.preventDefault()}>
                    <Space>
                        Status
                        <DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
        </div>
        <Table
            loading={loading}
            bordered={true}
            className="w-100"
            columns={columns}
            dataSource={displayData()}
            pagination={{
                disabled: loading,
                size: 'small',
                total: totalCalls,
                showSizeChanger: false,
                className: 'pagination',
                onChange: onPageChange,
                showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total} results`
            }}
        />
    </div>
}

export default Home