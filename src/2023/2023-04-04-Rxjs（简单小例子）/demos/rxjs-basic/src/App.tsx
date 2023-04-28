import BufferCountCp from './components/Operators/Buffer/BufferCountCp';
import ColdObservableCp from './components/Creation/ColdObservableCp';
import EmptyCp from './components/Creation/EmptyCp';
import ForkJoinCp from './components/Creation/ForkJoinCp';
import FromCp from './components/Creation/FromCp';
import FromEventCp from './components/Creation/FromEventCp';
import HotObservableCp from './components/Creation/HotObservableCp';
import IntervalCp from './components/Creation/IntervalCp';
import ObservableCp from './components/Creation/ObservableCp';
import OfCp from './components/Creation/OfCp';
import RangeCp from './components/Creation/RangeCp';
import TearDownCp from './components/Creation/TearDownCp';
import TimerCp from './components/Creation/TimerCp';
import TapCp from './components/Operators/TapCp';
import StartWithCp from './components/Operators/StartWithCp';
import FilterCp from './components/Operators/FilterCp';
import MapCp from './components/Operators/MapCp';
import CatchErrorCp from './components/Operators/CatchErrorCp';
import ConcatCp from './components/Creation/ConcatCp';
import DebounceTimeCp from './components/Operators/DebounceTimeCp';
import ConcatMapCp from './components/Operators/FlatteningOperators/ConcatMapCp';
import SwitchMapCp from './components/Operators/FlatteningOperators/SwitchMapCp';
import MergeMapCp from './components/Operators/FlatteningOperators/MergeMapCp';
import SubjectCp from './components/Subject/SubjectCp';
import BehaviorSubjectCp from './components/Subject/BehaviorSubjectCp';
import AsyncSchedulerCp from './components/Scheduler/AsyncSchedulerCp';
import QueueSchedulerCp from './components/Scheduler/QueueSchedulerCp';
import AsapSchedulerCp from './components/Scheduler/AsapSchedulerCp';
import AnimationFrameSchedulerCp from './components/Scheduler/AnimationFrameSchedulerCp';
import BindCallbackCp from './components/Creation/BindCallbackCp';
import DeferCp from './components/Creation/DeferCp';
import FromEventPatternCp from './components/Creation/FromEventPatternCp';

function App() {
	return (
		<div>
			<div>
				<p>Creation Functions</p>
				<ObservableCp></ObservableCp>
				<TearDownCp></TearDownCp>
				<OfCp></OfCp>
				<RangeCp></RangeCp>
				<IntervalCp></IntervalCp>
				<FromCp></FromCp>
				<FromEventCp></FromEventCp>
				<FromEventPatternCp></FromEventPatternCp>
				<ForkJoinCp></ForkJoinCp>
				<EmptyCp></EmptyCp>
				<TimerCp></TimerCp>
				<ColdObservableCp></ColdObservableCp>
				<HotObservableCp></HotObservableCp>
				<ConcatCp></ConcatCp>
				<BindCallbackCp></BindCallbackCp>
				<DeferCp></DeferCp>
			</div>
			<div>
				<p>Operators</p>
				<div>
					<p>Basic Operators</p>
					<TapCp></TapCp>
					<StartWithCp></StartWithCp>
					<MapCp></MapCp>
					<FilterCp></FilterCp>
					<CatchErrorCp></CatchErrorCp>
					<DebounceTimeCp></DebounceTimeCp>
				</div>
				<div>
					<p>Flattening Operators</p>
					<ConcatMapCp></ConcatMapCp>
					<SwitchMapCp></SwitchMapCp>
					<MergeMapCp></MergeMapCp>
				</div>
				<div>
					<p>Buffer Operators</p>
					<BufferCountCp></BufferCountCp>
				</div>
			</div>
			<div>
				<p>Subject</p>
				<SubjectCp></SubjectCp>
				<BehaviorSubjectCp></BehaviorSubjectCp>
			</div>
			<div>
				<p>Scheduler</p>
				<AsyncSchedulerCp></AsyncSchedulerCp>
				<QueueSchedulerCp></QueueSchedulerCp>
				<AsapSchedulerCp></AsapSchedulerCp>
				<AnimationFrameSchedulerCp></AnimationFrameSchedulerCp>
			</div>
		</div>
	);
}

export default App;
