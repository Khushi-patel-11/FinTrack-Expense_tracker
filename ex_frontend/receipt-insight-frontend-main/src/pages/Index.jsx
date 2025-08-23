import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CategoryChart from '@/components/CategoryChart';
import ExpenseChart from '@/components/ExpenseChart';
import InsightCard from '@/components/InsightCard';
import BudgetAlert from '@/components/BudgetAlert';
import ExportButton from '@/components/ExportButton';
import ScrollToTop from '@/components/ScrollToTop';
import SetBudgetModal from '@/components/SetBudgetModal';
import CategoryBudgetProgress from '@/components/CategoryBudgetProgress';
import PredictedAmountCard from '@/components/PredictedAmountCard';


import {
	FaDollarSign, FaChartLine, FaCreditCard, FaCalendarAlt, FaArrowUp, FaArrowDown, FaPlus, FaEye, FaSignOutAlt,
	FaRobot,
	FaReceipt,
	FaChartBar
} from 'react-icons/fa';
import axios from 'axios';
import { PiggyBank } from 'lucide-react';



const Index = () => {
	const navigate = useNavigate();
	const [timeRange, setTimeRange] = useState('month');
	const [username, setUsername] = useState(localStorage.getItem('username') || 'User');
	const [expenseData, setExpenseData] = useState([]);
	const [monthlyData, setMonthlyData] = useState([]);
	const [showBudgetModal, setShowBudgetModal] = useState(false);
	const [categoryData, setCategoryData] = useState([]);

	// const handleLogout = () => {
	//     localStorage.removeItem('isAuthenticated');
	//     localStorage.removeItem('username');
	//     navigate('/intro');
	// };

	// const stats = {
	//     totalExpenses: 2847.50,
	//     categoriesTracked: 8,
	//     transactions: 47,
	//     monthlyChange: 12.5,
	//     monthlyBudget: 3500,
	//     dailyAverage: 94.92
	// };

	const [stats, setStats] = useState(null);
	const [budgetUsed, setBudgetUsed] = useState(0);

	// budgetUsed = (stats.totalExpenses / stats.monthlyBudget) * 100;

	// const categoryData = [
	//     { name: 'Food & Dining', value: 850, color: '#6366F1' },
	//     { name: 'Transportation', value: 420, color: '#3B82F6' },
	//     { name: 'Shopping', value: 680, color: '#F59E0B' },
	//     { name: 'Entertainment', value: 320, color: '#10B981' },
	//     { name: 'Bills & Utilities', value: 577.50, color: '#EF4444' },
	// ];

	useEffect(() => {
		const token = localStorage.getItem('token');

		const fetchExpenseData = async () => {
			try {
				console.log('Token is fromm fetch expnese data :', token);
				const response = await axios.get("http://127.0.0.1:8000/api/expenses/list", {
					// http://127.0.0.1:8000/api/expenses/categorize-items/
					headers: {
						Authorization: `Token ${token}`

					},
				});
				console.log("✅ Expense data:", response.data);
				setMonthlyData(response.data);
				// setExpenseData(response.data); // Only if you have a state like this

			} catch (error) {
				console.error("❌ Failed to fetch expense data:", error);
			}
		};

		const fetchStats = async () => {
			try {
				const res = await axios.get('http://127.0.0.1:8000/api/expenses/budget-dashboard/', {
					headers: {
						Authorization: `Token ${token}`  // Adjust based on your token method
					}
				});
				setStats(res.data);
				console.log('Budget data :', res.data);
				if (res.data.monthlyBudget > 0) {
					const used = (res.data.totalExpenses / res.data.monthlyBudget) * 100;
					setBudgetUsed(used);
				} else {
					setBudgetUsed(0);
				}
			} catch (err) {
				console.error('Error fetching budget stats:', err);
			}
		};

		// const fetchCategoryData = async () => {
		//     try {
		//         const token = localStorage.getItem("token");
		//         const res = await axios.get("http://127.0.0.1:8000/api/expenses/category-summary/", {
		//             headers: { Authorization: `Token ${token}` },
		//         });

		//         // API should return something like:
		//         // [{ category: "Food & Dining", total: 850 }, ...]
		//         const formatted = res.data.map((item, idx) => ({
		//             name: item.category,
		//             value: item.total,
		//             color: chartColors[idx % chartColors.length],
		//         }));

		//         setCategoryData(formatted);
		//     } catch (error) {
		//         console.error("Error fetching category data:", error);
		//     }
		// };
		const fetchCategorySummary = async () => {
			try {
				const res = await axios.get("http://127.0.0.1:8000/api/expenses/category-summary/", {
					headers: {
						Authorization: `Token ${token}`
					}
				});

				// Extended 10-color palette
				const palette = [
					"#6366F1", // Indigo
					"#3B82F6", // Blue
					"#F59E0B", // Amber
					"#10B981", // Emerald
					"#EF4444", // Red
					"#8B5CF6", // Violet
					"#EC4899", // Pink
					"#14B8A6", // Teal
					"#F97316", // Orange
					"#84CC16"  // Lime
				];

				const chartData = res.data.map((item, index) => ({
					name: item.category,
					value: parseFloat(item.total),
					color: palette[index % palette.length]
				}));

				setCategoryData(chartData);
			} catch (err) {
				console.error("Error fetching category summary:", err);
			}
		};

		const chartColors = ["#6366F1", "#3B82F6", "#F59E0B", "#10B981", "#EF4444"];
		fetchExpenseData();
		fetchStats();
		fetchCategorySummary();
	}, []);
	const mockExpenses = [
		{
			id: 1,
			company: 'Starbucks Coffee',
			amount: 15.99,
			date: '2024-06-28',
			category: 'Food & Dining',
			description: 'Morning coffee and pastry'
		},
		{
			id: 2,
			company: 'Uber',
			amount: 32.50,
			date: '2024-06-27',
			category: 'Transportation',
			description: 'Ride to downtown office'
		},
		{
			id: 3,
			company: 'Amazon',
			amount: 89.99,
			date: '2024-06-25',
			category: 'Shopping',
			description: 'Office supplies and electronics'
		}
	];

	const insights = [
		{
			title: "Spending Alert",
			description: "You've spent 23% more on dining out this month compared to last month. Consider cooking at home more often to save money.",
			type: "warning",
			suggestion: "Try meal prepping on Sundays to reduce dining expenses by up to ₹200/month."
		},
		{
			title: "Great Job!",
			description: "You've successfully stayed within your transportation budget for 3 consecutive months.",
			type: "success",
			suggestion: "Consider investing the saved transportation money into your emergency fund."
		},
		{
			title: "Budget Insight",
			description: "Your entertainment expenses are 15% below average this month. You have room to enjoy more activities.",
			type: "info"
		}
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut"
			}
		},
		hover: {
			y: -8,
			scale: 1.02,
			transition: {
				duration: 0.2,
				ease: "easeOut"
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-all duration-300">
			<Header />

			{/* <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/30 transition-all duration-300">
                <Header /> */}

			{/* Hero Section 
			<section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-slate-800 text-white">
				{/* Background Decorative Elements 
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
					<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
				</div>

				<div className="relative container mx-auto px-6 py-16 lg:py-24 max-w-7xl">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Hero Content 
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="space-y-8"
						>
							<div className="space-y-6">
								<h1 className="text-5xl lg:text-6xl font-bold leading-tight">
									Track Expenses Smarter with{' '}
									<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
										SmartBill
									</span>
								</h1>

								<p className="text-xl lg:text-2xl text-purple-100 leading-relaxed max-w-2xl">
									Transform how you manage expenses with AI-powered receipt scanning, smart categorization, and insightful financial analytics.
								</p>
							</div>

							{/* Action Buttons 
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									onClick={() => navigate('/add-expense')}
									className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group border-0"
									size="lg"
								>
									Get Started
									<FaPlus className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
								</Button>

								<Button
									variant="outline"
									className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white hover:text-white px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
									size="lg"
								>
									Learn More
								</Button>
							</div>
						</motion.div>

						{/* Hero Illustration 
						{/* <motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="relative"
						>
							<div className="grid grid-cols-2 gap-6">
								{/* Feature Cards 
								<motion.div
									whileHover={{ scale: 1.05, y: -10 }}
									className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
								>
									<div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
										<FaRobot className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2">AI Scanning</h3>
									<p className="text-purple-100 text-sm">Automatic receipt recognition</p>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.05, y: -10 }}
									className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8"
								>
									<div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
										<FaReceipt className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2">Smart Categories</h3>
									<p className="text-purple-100 text-sm">Auto expense sorting</p>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.05, y: -10 }}
									className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 -mt-4"
								>
									<div className="bg-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
										<FaChartBar className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2">Visual Insights</h3>
									<p className="text-purple-100 text-sm">Spending analytics</p>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.05, y: -10 }}
									className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-4"
								>
									<div className="bg-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
										<FaChartLine className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2">Predictions</h3>
									<p className="text-purple-100 text-sm">Future spending trends</p>
								</motion.div>
							</div>
						</motion.div> 
					</div>
				</div>
			</section>*/}


			<main className="container mx-auto px-6 py-8 max-w-7xl">
				{/* Welcome Section */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<SetBudgetModal />
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
						<div>
							<h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
								Welcome back, {username}👋
							</h1>
							<p className="text-slate-600 dark:text-slate-400">Here's your expense overview for this month</p>
						</div>
						<div>
						</div>
						<div className="flex items-center gap-3">
							<ExportButton expenses={monthlyData} title={`Expense Report  `} />
							<div className="flex bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl p-1">
								{/* {['month', 'year'].map((period) => ( */}
								{['month'].map((period) => (
									<button
										key={period}
										onClick={() => setTimeRange(period)}
										className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 capitalize ${timeRange === period
											? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
											: 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700'
											}`}
									>
										{period}
									</button>
								))}
							</div>
							{/* <Button
								onClick={() => navigate('/add-expense')}
								className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
							>
								<FaPlus className="mr-2 h-4 w-4" />
								Add Expense
							</Button> */}
							{/* <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="border-red-200 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                                <FaSignOutAlt className="mr-2 h-4 w-4" />
                                Logout
                            </Button> */}
							<Button
								onClick={() => setShowBudgetModal(true)}
								className="bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300"
							>
								<PiggyBank className="mr-2 h-4 w-4" />
								Set Budget
							</Button>

						</div>
					</div>
				</motion.div>

				{/* Stats Cards */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
					// className="flex flex-row flex-wrap justify-center items-stretch gap-6 mb-8"
					// className="flex flex-row flex-wrap justify-center items-stretch gap-6 mb-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div variants={cardVariants} whileHover="hover">
						<Card className="group bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg cursor-pointer">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 ">
								<CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 ">
									Total Expenses
								</CardTitle>
								<div className="w-8 p-2 bg-emerald-500 rounded-xl text-white font-bold text-sm">
									₹
								</div>
							</CardHeader>

							<CardContent>
								{/* <div className="flex items-baseline gap-2 text-center"> */}
								<div className="flex flex-col items-center justify-center text-center gap-2">
									<div className="text-2xl font-bold text-slate-800 dark:text-slate-100 ">
										{/* ₹{stats.totalExpenses.toLocaleString()} */}
										₹{stats?.totalExpenses?.toLocaleString?.() ?? '0'}
									</div>
									{/* <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700">
										<FaArrowUp className="w-3 h-3 mr-1" />
										{isNaN(Number(stats?.monthlyChange))
											? "+0.0%"
											: `+${Number(stats.monthlyChange).toFixed(1)}%`}
									</Badge> */}

								</div>
								<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">This month</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div variants={cardVariants} whileHover="hover">
						<Card className="group bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg cursor-pointer">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
								<CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Categories</CardTitle>
								<div className="p-2 bg-indigo-500 rounded-xl">
									<FaChartLine className="h-4 w-4 text-white" />
								</div>
							</CardHeader>
							<CardContent>
								{/* <div className="flex items-baseline gap-2"> */}
								<div className="flex flex-col items-center justify-center text-center gap-2">

									{/* <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.categoriesTracked }</div> */}
									<div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
										{stats?.categoriesTracked ?? 0}
									</div>

									{/* <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700">
										Active
									</Badge> */}
								</div>
								<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Expense categories</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div variants={cardVariants} whileHover="hover">
						<Card className="group bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg cursor-pointer">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
								<CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Transactions</CardTitle>
								<div className="p-2 bg-blue-500 rounded-xl">
									<FaCreditCard className="h-4 w-4 text-white" />
								</div>
							</CardHeader>
							<CardContent>
								{/* <div className="flex items-baseline gap-2"> */}
								<div className="flex flex-col items-center justify-center text-center gap-2">
									{/* <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.transactions}</div> */}
									<div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats?.transactions ?? 0}
									</div>

									{/* <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700">
										This month
									</Badge> */}
								</div>
								<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Total count</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div variants={cardVariants} whileHover="hover">
						<Card className="group bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg cursor-pointer">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
								<CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Avg. Daily</CardTitle>
								<div className="p-2 bg-amber-500 rounded-xl">
									<FaCalendarAlt className="h-4 w-4 text-white" />
								</div>
							</CardHeader>
							<CardContent>
								{/* <div className="flex items-baseline gap-2"> */}
								<div className="flex flex-col items-center justify-center text-center gap-2">
									<div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
										{/* ₹{stats.dailyAverage ?? 0} */}
										₹{stats?.dailyAverage ?? 0}
									</div>
									{/* <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700">
										<FaArrowDown className="w-3 h-3 mr-1" />
										-2.1%
									</Badge> */}
								</div>
								<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Per day spending</p>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>

				{/* Budget Alert */}

				{/* Budget Progress */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{stats && (
						<>
							<BudgetAlert totalExpenses={stats.totalExpenses} monthlyBudget={stats.monthlyBudget} />

							<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
								<CardHeader className="pb-4">
									<CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Monthly Budget Progress</CardTitle>
									<CardDescription className="text-slate-600 dark:text-slate-400">
										₹{stats.totalExpenses.toLocaleString()} of ₹{stats.monthlyBudget.toLocaleString()} used
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{/* <Progress value={budgetUsed} className="h-3" /> */}
										<Progress
											value={budgetUsed}
											className="h-3 bg-slate-300 dark:bg-slate-700"
											indicatorClassName={
												budgetUsed > 95
													? "bg-red-500"
													: budgetUsed > 80
														? "bg-progress-warning"
														: "bg-green-500"
											}
										/>

										<div className="flex justify-between text-sm">
											<span className="text-slate-600 dark:text-slate-400">{budgetUsed.toFixed(1)}% used</span>
											<span className="text-slate-600 dark:text-slate-400">₹{(stats.monthlyBudget - stats.totalExpenses).toLocaleString()} remaining</span>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CategoryBudgetProgress />
							</Card>
						</>
					)}
				</motion.div>
				{/* <CategoryBudgetProgress /> */}



				{/* Charts Section */}
				{/* <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Spending by Category</CardTitle>
                                    <CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
                                        Your expense distribution this month
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <FaEye className="h-4 w-4 mr-2" />
                                    View All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <CategoryChart data={categoryData} />
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                                        {timeRange === 'year' ? 'Yearly' : '6-Month'} Expense Trend
                                    </CardTitle>
                                    <CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
                                        {timeRange === 'year' ? 'Annual spending trend' : 'Monthly spending over the last 6 months'}
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <FaEye className="h-4 w-4 mr-2" />
                                    Details
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <ExpenseChart data={expenseData} timeRange={timeRange} />
                        </CardContent>
                    </Card>
                </motion.div> */}
				{/* 
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					{/* Spending by Category 
					<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
										Spending by Category
									</CardTitle>
									<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
										Your expense distribution this month
									</CardDescription>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
								>
									<FaEye className="h-4 w-4 mr-2" />
									View All
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-0">
							{categoryData && categoryData.length > 0 ? (
								<CategoryChart data={categoryData} />
							) : (
								<p className="text-center text-slate-500 dark:text-slate-400 py-10">
									No category data available
								</p>
							)}
						</CardContent>
					</Card>

					{/* Expense Trend 
					<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
										{timeRange === "year" ? "Yearly" : "Months"} Expense Trend
									</CardTitle>
									<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
										{timeRange === "year"
											? "Annual spending trend"
											: `Monthly spending over the last  months`}
									</CardDescription>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
								>
									<FaEye className="h-4 w-4 mr-2" />
									Details
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-0">
							{expenseData && expenseData.length > 0 ? (
								<>
									console.log('Its working')
									<ExpenseChart data={expenseData} timeRange={timeRange} />
								</>
							) : (
								<p className="text-center text-slate-500 dark:text-slate-400 py-10">
									{/* `No expense data available ${expenseData}` 
									{/* `No expense data available ${expenseData}` 
									No expense data available: {JSON.stringify(expenseData)}
								</p>
							)}
						</CardContent>
					</Card>
				</motion.div>
				 */}

				{/* Charts Section
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg" style={{ minHeight: 420 }}>
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Spending by Category</CardTitle>
									<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
										Your expense distribution this month
									</CardDescription>
								</div>
								<Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700">
									<FaEye className="h-4 w-4 mr-2" />
									View All
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-0" style={{ minHeight: 320 }}>
							<CategoryChart data={categoryData} />
						</CardContent>
					</Card>

					<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg" style={{ minHeight: 460 }}>
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
										{timeRange === 'year' ? 'Yearly' : 'Months'} Expense Trend
									</CardTitle>
									<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
										{/* {timeRange === 'year' ? 'Annual spending trend' : `Monthly spending over the last ${expenseData && expenseData.length ? expenseData.length : 0} month${expenseData && expenseData.length === 1 ? '' : 's'}`} 
										{timeRange === 'year' ? 'Annual spending trend' : `Monthly spending over the last ${monthlyData && monthlyData.length ? monthlyData.length : 0} month${monthlyData && monthlyData.length === 1 ? '' : 's'}`}
									</CardDescription>
								</div>
								<Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700">
									<FaEye className="h-4 w-4 mr-2" />
									Details
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-0" style={{ minHeight: 360 }}>
							<ExpenseChart data={expenseData} timeRange={timeRange} />
							{/* Legend for predicted point 
							<div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
								<span
									style={{
										display: 'inline-block',
										width: 14,
										height: 14,
										borderRadius: '50%',
										background: '#ff5722',
										border: '2px solid #d84315',
										marginRight: 8
									}}
								></span>
								Orange color is the predicted next month amount
							</div>
						</CardContent>
					</Card>
				</motion.div> */}


				{/* Row 1: Pie chart + Categories list
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
					{/* Pie Chart (60%) 
					<div className="lg:col-span-3">
						<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg" style={{ minHeight: 420 }}>
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Spending by Category</CardTitle>
										<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
											Your expense distribution this month
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-0" style={{ minHeight: 320 }}>
								<CategoryChart data={categoryData} />
							</CardContent>
						</Card>
					</div>
					{/* Categories List (40%) 
					<div className="lg:col-span-2">
						<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg h-full">
							<CardHeader className="pb-4">
								<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Categories</CardTitle>
								<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
									List of categories and totals
								</CardDescription>
							</CardHeader>
							<CardContent>
								{categoryData && categoryData.length > 0 ? (
									<ul className="divide-y divide-gray-200 dark:divide-slate-700">
										{categoryData.map((cat, idx) => (
											<li key={cat.name} className="flex items-center justify-between py-2">
												<span className="flex items-center gap-2">
													<span className="inline-block w-3 h-3 rounded-full" style={{ background: cat.color }}></span>
													<span className="text-slate-700 dark:text-slate-200">{cat.name}</span>
												</span>
												<span className="font-semibold text-slate-800 dark:text-slate-100">₹{cat.value.toLocaleString()}</span>
											</li>
										))}
									</ul>
								) : (
									<p className="text-center text-slate-500 dark:text-slate-400 py-10">
										No category data available
									</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div> */}

				{/* Row 1: Pie chart + Categories list */}
				<div className="flex flex-col lg:flex-row gap-8 mb-8">
					{/* Pie Chart (60%) */}
					<div className="w-full lg:w-3/5 flex">
						<Card className="flex flex-col flex-1 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg h-full">
							<CardHeader className="pb-4">
								<div>
									<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Spending by Category</CardTitle>
									<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
										Your expense distribution this month
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent className="flex-1 flex items-center justify-center">
								<div className="w-full aspect-square max-w-[400px] mx-auto">
									<CategoryChart data={categoryData} />
								</div>
							</CardContent>
						</Card>
					</div>
					{/* Categories List (40%) */}
					<div className="w-full lg:w-2/5 flex">
						<Card className="flex flex-col flex-1 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg h-full">
							<CardHeader className="pb-4">
								<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Categories</CardTitle>
								<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
									List of categories and totals
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								{categoryData && categoryData.length > 0 ? (
									<ul className="divide-y divide-gray-200 dark:divide-slate-700">
										{categoryData.map((cat, idx) => (
											<li key={cat.name} className="flex items-center justify-between py-2">
												<span className="flex items-center gap-2">
													<span className="inline-block w-3 h-3 rounded-full" style={{ background: cat.color }}></span>
													<span className="text-slate-700 dark:text-slate-200">{cat.name}</span>
												</span>
												<span className="font-semibold text-slate-800 dark:text-slate-100">₹{cat.value.toLocaleString()}</span>
											</li>
										))}
									</ul>
								) : (
									<p className="text-center text-slate-500 dark:text-slate-400 py-10">
										No category data available
									</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Row 2: Expense Trend + Predicted Amount card */}
				<div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-8">
					{/* Expense Trend (70%) */}
					<div className="lg:col-span-7">
						<Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg" style={{ minHeight: 460 }}>
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
											{timeRange === 'year' ? 'Yearly' : 'Months'} Expense Trend
										</CardTitle>
										<CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
											{timeRange === 'year'
												? 'Annual spending trend'
												: `Your spending pattern month by month`}
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-0" style={{ minHeight: 360 }}>
								<ExpenseChart data={expenseData} timeRange={timeRange} />
							</CardContent>
						</Card>
					</div>
					{/* Predicted Amount Card (30%) */}
					<div className="lg:col-span-3 ">
						<PredictedAmountCard />
					</div>
				</div>

				{/* Insights Section
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Smart Insights</h2>
							<p className="text-slate-600 dark:text-slate-400 mt-1">AI-powered recommendations for better spending</p>
						</div>
						<Button variant="outline" className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
							View All Insights
						</Button>
					</div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{insights.map((insight, index) => (
							<motion.div key={index} variants={cardVariants} whileHover="hover">
								<InsightCard {...insight} />
							</motion.div>
						))}
					</motion.div>
				</motion.div> */}
			</main>
			<SetBudgetModal
				visible={showBudgetModal}
				onClose={() => setShowBudgetModal(false)}
				onSubmit={(budgetData) => {
					// You can handle form submission here (e.g., send to backend)
					console.log("Submitted budget data:", budgetData);
					setShowBudgetModal(false);
				}}
			/>
			<ScrollToTop />
		</div>
	);
};

export default Index;
