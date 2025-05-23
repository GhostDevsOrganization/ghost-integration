import { Experiment, ExperimentResult, ResearchPaper } from '../types';
import { Database } from '../database/Database';

export class ResearchFramework {
    constructor(private readonly db: Database) { }

    /**
     * Register a new research experiment
     */
    public async registerExperiment(experiment: Experiment): Promise<string> {
        // Generate unique ID
        const experimentId = this.generateUniqueId();

        // Store experiment metadata
        await this.db.experiments.insert({
            id: experimentId,
            ...experiment,
            status: 'REGISTERED',
            createdAt: new Date(),
            results: []
        });

        return experimentId;
    }

    /**
     * Record results for an experiment
     */
    public async recordExperimentResult(
        experimentId: string,
        result: ExperimentResult
    ): Promise<void> {
        const experiment = await this.db.experiments.findOne({ id: experimentId });
        if (!experiment) {
            throw new Error(`Experiment ${experimentId} not found`);
        }

        // Add result to experiment
        await this.db.experiments.update(
            { id: experimentId },
            {
                $push: { results: { ...result, recordedAt: new Date() } },
                $set: { lastUpdated: new Date() }
            }
        );
    }

    /**
     * Publish a research paper based on experiments
     */
    public async publishPaper(paper: ResearchPaper): Promise<string> {
        // Generate DOI
        const doi = this.generateDOI();

        // Store paper metadata
        await this.db.papers.insert({
            doi,
            ...paper